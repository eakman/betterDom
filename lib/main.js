
$bD(() => {
  let i = 0;
  let j = 0;
  $bD('.add').on('click', () => {
    const listName = $bD('.list-name').elements[0].value;
    const listClass = `list-${i}`;
    $bD('body').append(`<div class='list-div'>
              <button class='remove-${listClass}'>x</button>
              <h1 class='list-title'>${listName}</h1>
              <div class='list-inputs'>
                <input class='${listClass}-input item-input'
                    type='text' placeholder='new item' />
                <button class='${listClass}-button item-button'>add item</button>
              </div>
            <ul class='${listClass} todo-list'></ul>
            </div>`);
      $bD(`.${listClass}-button`).on('click', () => {
        const itemName = $bD(`.${listClass}-input`).elements[0].value;
        $bD(`.${listClass}`).append(`<li>${itemName}
          <button class='item-${j}'>x</button>
          </li>`);
        $bD(`.item-${j}`).on('click', (e) => {
          // debugger
          e.target.parentNode.remove();
        });
        $bD(`.${listClass}-input`).elements[0].value = '';
        j++;
      });
      $bD(`.remove-${listClass}`).on('click', (e) => {
        e.target.parentNode.remove();
      });
      $bD('.list-name').elements[0].value = '';
      i++;
  });
});
