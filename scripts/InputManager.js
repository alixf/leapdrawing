window.InputManager = function(element)
{
    var data = [];
    var keydown = function(event)
    {
        data[event.keyCode] = true;
    }
    var keyup = function(event)
    {
        data[event.keyCode] = false;
    }
    this.isKeyDown = function(keyCode)
    {
        return data[keyCode];
    }
    element.addEventListener("keydown", keydown);
    element.addEventListener("keyup", keyup);
};