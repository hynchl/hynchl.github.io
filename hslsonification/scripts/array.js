let arr = {}

arr.arange = (a, b, step) => {
    const len = b-a;
    const n = Math.floor(len/step);
    
    let outcome = new Array(n);
    for (let i = 0; i < outcome.length; i++) {
      outcome[i] = a + step * i;
    }
    return outcome;
}
  
arr.linspace = (a, b, n) => {
    const len = b-a;
    const step = len/n;
  
    let outcome = new Array(n);
    for (let i = 0; i < outcome.length; i++) {
      outcome[i] = a + step * i;
    }
    return outcome;
    
  }

arr.exp = (X) => {
    for (let i= 0; i < X.length; i++) {
        X[i] = Math.exp(X[i]);
    }
    return X;
}


arr.max = (X) => {
    let max = -Infinity;
    for (let i= 0; i < X.length; i++) {
        if (X[i] > max) {
            max = X[i];
        }
    }
    return max;
}

arr.min = (X) => {
    let min = Infinity;
    for (let i= 0; i < X.length; i++) {
        if (X[i] < min) {
            min = X[i];
        }
    }
    return min
}

arr.mean = (X) => {
    let sum = 0;
    for (let i= 0; i < X.length; i++) {
        sum += X[i];
    }
    return sum/X.length;
}

arr.normalize = (X) => {
    const max = arr.max(X), min = arr.min(X);
    for (let i= 0; i < X.length; i++) {
        X[i] = ((X[i]-min) / (max-min)) * 2 - 1
    }
    return X;
}

arr.subtract = (A, B) => {
    const outcome = new Array(A.length);
    for (let i= 0; i < outcome.length; i++) {
        outcome[i] = A[i] - B[i];
    }
    return outcome;
}

arr.add = (A, B) => {
    const outcome = new Array(A.length);
    for (let i= 0; i < outcome.length; i++) {
        outcome[i] = A[i] + B[i];
    }
    return outcome;
}

arr.getLengths = (X) => {
    // X : nested array
    const outcome = new Array(X.length);
    for (let i= 0; i < outcome.length; i++) {
        outcome[i] = X[i].length;
    }
    return outcome;
}

arr.resample = (X, targetLength) => {
    let outcome = new Array(targetLength);
    let rel = X.length/targetLength;
    for(let i=0; i <outcome.length; i++){
        let t = rel*i;
        // console.log(t)
        let val = lerp(Math.floor(t), Math.ceil(t), t%1)
        outcome[i] = val;
    }
    return outcome;
}

arr.lerp = (A, B, t) => {
    // TODO : Add Validation
    let outcome = new Array(targetLength);
    for(let i=0; i <outcome.length; i++){
        outcome[i] = ((1 - t) * A[i]) + (t * B[i]);;
    }
}

function lerp(v0, v1, t) {
return ((1 - t) * v0) + (t * v1);
}