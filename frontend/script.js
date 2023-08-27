document.addEventListener('DOMContentLoaded', () => {
    const numberList = document.getElementById('number-list');
    const columnsSlider = document.getElementById('columns');
    const fontSizeSlider = document.getElementById('fontSize');
    const rowGapSlider = document.getElementById('rowGap');
    const columnsValue = document.getElementById('columnsValue');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const rowGapValue = document.getElementById('rowGapValue');
    const equationInput = document.getElementById('equation');
    const updateButton = document.getElementById('update-btn');

    // Function to update the displayed numbers based on slider values and equation
    function updateNumbers(equation = '') {
        const columns = parseInt(columnsSlider.value);
        const fontSize = fontSizeSlider.value + 'px';
        const rowGap = rowGapSlider.value + 'px';

        let fetchUrl = 'http://localhost:5000/numbers';
        if (equation) {
            fetchUrl += `?equation=${encodeURIComponent(equation)}`;
        }

        fetch(fetchUrl)
            .then(response => response.json())
            .then(numbers => {
                numberList.innerHTML = ''; // Clear existing list

                const boxWidth = 100 / columns; // Calculate width for each box

                for (let i = 0; i < numbers.length; i++) {
                    const listItem = document.createElement('span');
                    listItem.classList.add('number-box');
                    listItem.textContent = numbers[i];
                    listItem.style.fontSize = fontSize;
                    listItem.style.width = `${boxWidth}%`; // Set box width
                    numberList.appendChild(listItem);
                }

                columnsValue.textContent = columnsSlider.value;
                fontSizeValue.textContent = fontSizeSlider.value + 'px';
                rowGapValue.textContent = rowGapSlider.value + 'px';
            })
            .catch(error => console.error('Error fetching numbers:', error));
    }

    updateNumbers();

    updateButton.addEventListener('click', () => {
        const equation = equationInput.value;
        updateNumbers(equation);
    });

    columnsSlider.addEventListener('input', updateNumbers);
    fontSizeSlider.addEventListener('input', updateNumbers);
    rowGapSlider.addEventListener('input', updateNumbers);
});
