class Lerp {
 
    constructor(from, to, delay) {
      this.from = from;
      this.to = to;
      this.delay = delay;
  
      this.value = from;
      this.time = 0;

      this.lerpSpeed = 1 / this.delay;

      return this;
    }
    
    update(timeDelta) {
        const t = this.time / this.delay;
        if (typeof this.value === 'number')
          this.value = (1 - t) * this.from + t * this.to;
        else if (typeof this.value === 'object') {
          for (const k of Object.keys(this.value)) {
            this.value[k] = (1 - t) * this.from[k] + t * this.to[k];
          }
        }
        this.time += timeDelta * this.lerpSpeed;

        if (this.onupdate)
          this.onupdate(this.value);
  
        if (this.time >= this.delay) {
          if (this.onfinish)
            this.onfinish();
          delete this;
        }
      }

    onUpdate(callback) {
        this.onupdate = callback;
        return this;
      }
    
    onFinish(callback) {
        this.onfinish = callback;
        return this;
      }
    
  }