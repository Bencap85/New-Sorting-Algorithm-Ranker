const REDUCING_FACTOR = 0.4;
const MAX_SIZE = 1000;
const MIN_SIZE = 4;
let array = [];
let isSorted = false;

function generateArray(size) {
    let array = [];
    for(let i = 0; i < size; i++) {
        let random = +(Math.random()*1000).toFixed(2);
        array.push(random);
    }
    return array;
}


function setUp() {
    isSorted = false;
    addEventListeners();
    array = generateArray(MAX_SIZE / 2);
    showBars(array);
    
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                  //
//              Find how to measure runtime of algorithms currectly. I am guessing there are threading/simultaneous execution       //
//              issues due to unreasonable and inconsistent readings                                                                //
//                                                                                                                                  //
//              Also need to make it so that after sort, the data has to be reset before it can be mutated. This is because         //
//              there are consistency issues when shrinking/expanding because shrinking the array after it is sorted results in     //
//              values smaller than the average random values. Add a "Close" button or something to reset after sort.    

//          
//                                                                                                                                  //
//                                                                                                                                  //
//                                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function addEventListeners() {
    document.getElementById('ordered-button').addEventListener('input', (e) => {
        array.sort((a, b) => a - b);
        showBars(array);
    });
    document.getElementById('reverse-ordered-button').addEventListener('input', (e) => {
        array.sort((a, b) => b - a);
        showBars(array);
    });
    document.getElementById('random-button').addEventListener('input', (e) => {
        let size = document.getElementById('size-slider').value;
        array = generateArray(size);
        showBars(array);
    });
    document.getElementById('new-array-button').addEventListener('click', (e) => {
        array = generateArray(MAX_SIZE/2);
        document.getElementById('size-slider').value = 500;
        let radioButtons = document.getElementsByName('order-buttons');
        for(let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }
        showBars(array);
    });
    
    
    document.getElementById('size-slider').addEventListener('input', (e) => {
        let change = parseInt(e.target.value) - array.length;
        
        if(change > 0) {
            let i = 0;
            while(i < change && i+array.length < MAX_SIZE) {
                let newVal = (Math.random()*1000).toFixed(2)
                array.push(newVal);
                addBar(newVal);
                i++;
            }
        } else {
            let i = 0;
            change = Math.abs(change);
            while(i <= change && array.length > MIN_SIZE) {
                removeBar();
                array.pop();
                i++;
            }
        }
        
    });
    
    document.getElementById('sort-button').addEventListener('click', (e) => {
        isSorted = !isSorted;
        if(isSorted) {
            e.target.textContent = "Close";
            
        } else {
            e.target.textContent = "Sort"
            
        }

        let times = getTimes(array);
        array.sort((a, b) => {
            return a-b;
        });
        
        showBars(array);

        
        const popup = document.getElementById('popup');
        const isExpanded = popup.classList.contains('expanded');
        console.log(popup.classList);
        if(isExpanded) {
            const interval = setInterval(() => {
                if(parseInt(popup.style.top) >= 68) {
                    clearInterval(interval);
                    return;
               } 
               popup.style.top = parseInt(popup.style.top) + 2 + '%';
            }, 10);

            //Delays adjustment of height until it lowers back to its original position
            const interval2 = setInterval(() => {
                popup.classList.remove('expanded');
                clearInterval(interval2);
            }, 140);
            
        } else {
            popup.classList += ' expanded';
            const interval = setInterval(() => {
                if(parseInt(popup.style.top) <= 40) {
                    clearInterval(interval);
                    return;
               } 
               popup.style.top = parseInt(popup.style.top) - 2 + '%';
            }, 10);
        }

        showResults();
        
    });
}
function showResults() {
    let times = getTimes(array);
    let parent = document.getElementById('results-wrapper');
    parent.innerHTML = '';

    parent.innerHTML += '<h2>Most Effecient:</h2>';

    for(let i = 0; i < times.length; i++) {
        let div = createResult(times[i].name, times[i].time);
        parent.appendChild(div);
    }

}
function createResult(name, time) {
    
    let div = document.createElement('div');
    div.classList += 'result';
    div.innerHTML = `
    <h2>${name}</h2>
    <p>${time}</p>
    `;
    return div;

}


function showBars(array) {
    const parent = document.getElementById('data');
    parent.innerHTML = '';

    for(let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.style.height = (REDUCING_FACTOR*array[i]) + 'px';
        bar.classList = "bar";
        parent.appendChild(bar);
    }
    
}
function addBar(value) {
    const bar = document.createElement('div');
    bar.classList = "bar";
    bar.style.height = (REDUCING_FACTOR * value) + 'px';
    document.getElementById('data').appendChild(bar);
}
function removeBar() {
    const data = document.getElementById('data');
    data.removeChild(data.lastElementChild);
}



setUp();