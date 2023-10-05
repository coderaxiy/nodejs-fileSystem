 
 class EventEmitter {
    listeners = {};

    addListener(eName, func) {
        this.listeners[eName] = this.listeners[eName] || []
        this.listeners[eName].push(func)
        return this;
    }

    on(event, func) {
        return this.addListener(event, func)
    }

    emit(event, ...args) {
        let funs = this.listeners[event]
        if(!funs) return false;
        funs.forEach(func => {
            func(...args);
        });
        return true;
    }

    once(event, func) {
        this.listeners[event] = this.listeners[event] || []
        const OnceOnly = () => {
            func();
            this.off(event, OnceOnly)
        }
        this.listeners[event].push(OnceOnly)
        return this
    }

    off(event, func) {
        return this.removeListener(event, func)
    }

    removeListener(event, func) {
        let list = this.listeners[event]
        if(!list) return this;
        for(let i = 0; i <= list.length; i++){
            if(list[i].toString() === func.toString()){
                list.splice(i, 1)
                break;
            }
        }
        return this;
    }
 }

 const myEmmitter = new EventEmitter()

 myEmmitter.once('foo', ()=>console.log('worked'))
 myEmmitter.emit('foo')
 myEmmitter.emit('foo')
 myEmmitter.emit('foo')
 myEmmitter.emit('foo')

