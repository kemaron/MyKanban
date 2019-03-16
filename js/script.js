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
    // Generator templatek (z wykorzystaniem mustache.js)
    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
      
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
      
        return element;
    }

    // ***** tworzę klasy *****
    
    function Card(description) {
        var self = this;      
        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', { description: this.description }, 'li');
    }

    function Column(name) {
        var self = this;
      
        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', { name: this.name });
    }





    // tworzę tablicę
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
          this.element.appendChild(column.element);
          initSortable(column.id); 
        },
        element: document.querySelector('#board .column-container')
    };
    


});