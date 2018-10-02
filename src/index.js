class SmartCalculator {
  constructor(initialValue) {
    this.stack = [];
    this.stack.push(initialValue);
  }

  add(number) {
    this.stack.push('+', number);
    return this;
  }
  
  subtract(number) {
    this.stack.push('-', number);
    return this;
  }

  multiply(number) {
    this.stack.push('*', number);
    return this;
  }

  devide(number) {
    this.stack.push('/', number);
    return this;
  }

  pow(number) {
    this.stack.push('^', number);
    return this;
  }

  valueOf() {
    const operators = {
      '+': {
        func: (x, y) => x + y,
        priority: 1
      },
      '-': {
        func: (x, y) => x - y,
        priority: 1
      },
      '*': {
        func: (x, y) => x * y,
        priority: 2
      },
      '/': {
        func: (x, y) => x / y,
        priority: 2
      },
      '^': {
        func: (x, y) => Math.pow(x, y),
        priority: 3
      }
    };

    let polish = (infix) => {
      const otherStack = [];
      const peek = (a) => a[a.length - 1];

      return infix
        .reduce((output, token) => {
          if (parseFloat(token)) {
            output.push(token);
          }

          if (token in operators) {
            let right = token === '^';
            while (peek(otherStack) in operators && (
              (operators[token].priority <= operators[peek(otherStack)].priority && !right) ||
              (operators[token].priority < operators[peek(otherStack)].priority && right)
            ))
              output.push(otherStack.pop());
            otherStack.push(token);
          }
          
          return output;
        }, [])
        .concat(otherStack.reverse());
    }    

    let value = (expr) => {
      const otherStack = [];

      expr.forEach((token) => {
        if (token in operators) {
          let [y, x] = [otherStack.pop(), otherStack.pop()];
          otherStack.push(operators[token].func(x, y));
        } else {
          otherStack.push(token);
        }    
      });

      return otherStack.pop();
    }

    return value(polish(this.stack));
  }
}
module.exports = SmartCalculator;