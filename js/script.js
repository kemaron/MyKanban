// czekam aż załadują się wszystkie elementy DOM
document.addEventListener('DOMContentLoaded', function() {
    // generator losowego stringa (ID)
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    // generator templatek (z wykorzystaniem mustache.js)
    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
      
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
      
        return element;
    }

    // sortowanie kart (z wykorzystaniem sortable.js)
    function initSortable(id) {
        console.log (id);
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {            
          group: 'kanban',
          sort: true
        });
        console.log ('jest: ' + sortable.group);
      }

    // ***** tworzę klasy *****
    
    function Card(description) {
        var self = this;      
        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', { description: this.description }, 'li');

        this.element.querySelector('.card').addEventListener('click', function (event) {
            event.stopPropagation();        
            if (event.target.classList.contains('btn-delete')) {
              self.removeCard();
            }
        });
    }

    function Column(name) {
        var self = this;      
        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', { name: this.name, id: this.id });

        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
              self.removeColumn();
            }
        
            if (event.target.classList.contains('btn-addCard')) {
              self.addCard(new Card(prompt("Enter the name of the card")));
            }
        });
    }
    // dodaje prototypy

    Card.prototype = {
        removeCard: function() {
            this.element.parentNode.removeChild(this.element);
        }
    }

    Column.prototype = {
        addCard: function(card) {
          this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function() {
          this.element.parentNode.removeChild(this.element);
        }
    };

    // ***** tworzę najwyższy element DOM (tablicę) *****
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
          this.element.appendChild(column.element);
          initSortable(column.id); 
        },
        element: document.querySelector('#board .column-container')
    };

    // dodawanie nowych kolumn do tablicy przyciskiem
    document.querySelector('#board .create-column').addEventListener('click', function() {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });


    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);

});