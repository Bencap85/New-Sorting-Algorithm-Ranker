function getTimes(arr) {
    let array = new Array(arr);
    let res = [];
    
    let bubbleSortStart = performance.now();
    bubbleSort(array);
    let bubbleSortEnd = performance.now();

    let mergeSortStart = performance.now();
    mergeSort(array);
    let mergeSortEnd = performance.now();

    let quickSortStart = performance.now();
    quickSort(array);
    let quickSortEnd = performance.now();

    let heapSortStart = performance.now();
    heapSort(array);
    let heapSortEnd = performance.now();

    res[0] = { name: 'Bubble Sort', 
               time: bubbleSortEnd - bubbleSortStart };

    res[1] = { name: 'Merge Sort',
               time: mergeSortEnd - mergeSortStart };

    res[2] = { name: 'Quick Sort',
               time: quickSortEnd - quickSortStart };

    res[3] = { name: 'Heap Sort',
               time: heapSortEnd - heapSortStart };
               
    console.log(JSON.stringify(res));

    return res;
    
}


function bubbleSort(arr) {
    let array = new Array(arr);
    let isSorted = false;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                isSorted = false;
            }
        }
    }
    return array;
}

function mergeSort(arr) {
    let array = new Array(arr);
    if (array.length <= 1) {
        return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
function quickSort(arr) {
    let array = new Array(arr);
    if (array.length <= 1) {
        return array;
    }
    const pivot = array[0];
    const left = [];
    const right = [];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}


function heapify(array, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest);
    }
}

function heapSort(arr) {
    let array = new Array(arr);
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        heapify(array, i, 0);
    }
    return array;
}

