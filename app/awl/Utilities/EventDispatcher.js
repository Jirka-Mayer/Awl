class EventDispatcher
{
    constructor()
    {
        this.events = {}
    }

    /**
     * Register an event listener
     */
    on(event, callback)
    {
        if (!this.events[event])
        {
            this.events[event] = {
                listeners: [],
                toBeIgnored: 0
            }
        }

        this.events[event].listeners.push(callback)
    }

    /**
     * Fire an event
     */
    fire(event)
    {
        if (!this.events[event])
            return

        if (this.events[event].toBeIgnored > 0)
        {
            this.events[event].toBeIgnored -= 1
            return
        }

        for (let i in this.events[event].listeners)
            this.events[event].listeners[i]()
    }

    /**
     * Prevent next event call from being fired
     */
    ignoreNext(event)
    {
        if (!this.events[event])
            return

        this.events[event].toBeIgnored += 1
    }
}

module.exports = EventDispatcher