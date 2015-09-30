$(function() {
  console.log( "ready!" );
  var chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        y: 'y',
        columns: [
          ['x', 0, 1, 2, 3, 4, 5],
          ['y', -3, -4, -3, 0, 5, 12]
        ]
      }
  })
});