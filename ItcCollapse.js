class ItcCollapse {
  constructor(target, duration = 350) {
    this._target = target;
    this._duration = duration;
  }
  show() {
    const el = this._target;
    // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
    if (
      el.classList.contains('collapsing') ||
      el.classList.contains('collapse_show')
    ) {
      return;
    }
    // удаляем класс collapse
    el.classList.remove('collapse');
    // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
    const height = el.offsetHeight;
    // устанавливаем высоте значение 0
    el.style['height'] = 0;
    // не отображаем содержимое элемента, выходящее за его пределы
    el.style['overflow'] = 'hidden';
    // создание анимации скольжения с помощью CSS свойства transition
    el.style['transition'] = `height ${this._duration}ms ease`;
    // добавляем класс collapsing
    el.classList.add('collapsing');
    // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
    el.offsetHeight;
    // установим в качестве значения высоты значение, которое мы сохранили в константу height
    el.style['height'] = `${height}px`;
    // по истечении времени анимации this._duration
    window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим классы collapse и collapse_show
      el.classList.add('collapse');
      el.classList.add('collapse_show');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
    }, this._duration);
  }
  hide() {
    // сохраняем элемент в константу el
    const el = this._target;
    // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
    if (
      el.classList.contains('collapsing') ||
      !el.classList.contains('collapse_show')
    ) {
      return;
    }
    // установим свойству height текущее значение высоты элемента
    el.style['height'] = `${el.offsetHeight}px`;
    // получим значение высоты
    el.offsetHeight;
    // установим CSS свойству height значение 0
    el.style['height'] = 0;
    // обрежем содержимое, выходящее за границы элемента
    el.style['overflow'] = 'hidden';
    // добавим CSS свойство transition для осуществления перехода длительностью this._duration
    el.style['transition'] = `height ${this._duration}ms ease`;
    // удалим классы collapse и collapse_show
    el.classList.remove('collapse');
    el.classList.remove('collapse_show');
    // добавим класс collapsing
    el.classList.add('collapsing');
    // после завершения времени анимации
    window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим класс collapsing
      el.classList.add('collapse');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
    }, this._duration);
  }
  toggle() {
    this._target.classList.contains('collapse_show')
      ? this.hide()
      : this.show();
  }
}
