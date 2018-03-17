require('../css/style.scss');

let selectedPane = 0;

window.addEventListener('keydown', (e)=>{
  if (e.keyCode == 39) {
    // right
    focusNewPane('next');
  } else if (e.keyCode == 37) {
    // left
    focusNewPane('prev');
  }
})

let lastTouch = 0;

window.addEventListener('touchstart', (e)=>{
  lastTouch = e.clientX;
})

window.addEventListener('touchend', (e)=>{
  let touchDist = e.clientX - lastTouch;
  if (touchDist > 20) {
    focusNewPane('next');
  } else if (touchDist < -20) {
    focusNewPane('prev');
  }
  lastTouch = 0;
})

$('#left').click(()=>{ focusNewPane('next') })
$('#right').click(()=>{ focusNewPane('prev') })

let containerDeg = 0;

function focusNewPane(dir) {
  let numPanes = $('.panes-container').children().length;
  let step = 360 / numPanes;
  if (dir == 'next') {
    containerDeg += step;
    selectedPane = selectedPane == $('.panes-container').children().length - 1 ? 0 : selectedPane + 1;
  } else {
    containerDeg -= step;
    selectedPane = selectedPane == 0 ? $('.panes-container').children().length - 1 : selectedPane - 1;
  }
  
  
  $('.panes-container').css({
    'transform': 'translate3d(0,0,-400px) perspective(1600px) rotateY(' + containerDeg + 'deg)'
  });
  
  $('.panes-container div').each(function(ind){
    if (ind == selectedPane) {
      $(this).addClass('highlighted-pane');
    } else {
      $(this).removeClass('highlighted-pane');
    }
  })
}

$(document).ready(()=>{  
  $('.panes-container div:first-child').addClass('highlighted-pane');
});

function DivViewModel() {
  this.els = ko.observableArray([  
    {
      'elNum': 0,
      'url': 'https://images.unsplash.com/photo-1503529896844-09b1209193a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2c12002fc2d69d4188677a3df05e9de0&auto=format&fit=crop&w=1949&q=80',
      'srcAlt': 'Night Sky'
    },
    {
      'elNum': 1,
      'url': 'https://images.unsplash.com/photo-1434495763612-eccafd3945cf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5196f95aa5e0d9150826ceca1df29017&auto=format&fit=crop&w=1950&q=80',
      'srcAlt': 'Through the Forest'
    },
    {
      'elNum': 2,
      'url': 'https://images.unsplash.com/photo-1469881317953-097ae79770ea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=021bd705da31106e1d61744eb70dfafd&auto=format&fit=crop&w=3900&q=80',
      'srcAlt': 'Meadow Flower'
    },
    {
      'elNum': 3,
      'url': 'https://images.unsplash.com/photo-1499070022014-ccac3a6416f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ae305093828193f016b6d5a22b6f7dd&auto=format&fit=crop&w=3714&q=80',
      'srcAlt': 'In a Big Pond'
    },
  ]);
}

ko.applyBindings(new DivViewModel());