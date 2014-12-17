window.InputManager = function(element)
{
    this.element = element;
    var data = [];
    this.bindings = [];
    
    var keydown = function(event)
    {
        if(!data[event.keyCode])
        {
            data[event.keyCode] = true;
            for(var i = 0; i < this.bindings.length; ++i)
                if(event.keyCode == this.bindings[i].keyCode)
                    this.bindings[i].tool.begin();
        }
    }
    var keyup = function(event)
    {
        if(data[event.keyCode])
        {
            data[event.keyCode] = false;
            for(var i = 0; i < this.bindings.length; ++i)
                if(event.keyCode == this.bindings[i].keyCode)
                    this.bindings[i].tool.end();
        }
    }
    this.isKeyDown = function(keyCode)
    {
        return data[keyCode];
    }
    this.register = function(tool, keyCode)
    {
        this.bindings.push({keyCode : keyCode, tool : tool});
    }
    
    this.element.addEventListener("keydown", keydown.bind(this));
    this.element.addEventListener("keyup", keyup.bind(this));
};