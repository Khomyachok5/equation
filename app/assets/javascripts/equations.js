$(function() {
  console.log( "ready!" );
  var x_array = [];
  var y_array = [];
  x_array.push('x', $('#vertex_x').data('x'))
  y_array.push('y', $('#vertex_y').data('y'))
  var index;
  var a =  Array.prototype.slice.call($('.element_name'), 0)
  for (index = 0; index < a.length; ++index) {
    x_array.push($(a[index]).data('x'));
  }
  var b =  Array.prototype.slice.call($('.element_y'), 0)
  for (index = 0; index < b.length; ++index) {
    y_array.push($(b[index]).data('y'));
  }
  var chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        y: 'y',
        columns: [
          x_array,
          y_array
        ]
      }
  })
});