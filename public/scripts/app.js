// Client facing scripts here
//create a helper function to format the date
//use document.Ready =>
// selectElementByClass to get the date
//   Select HTML element that displays type
//declare the options
//pass data into the new date constructor function
//
//.value() to append to the HTML element i need to format

$document.ready(function () {
  $("#date").on("input", function () {
    let date = $(this).val().length
    $eventDate = $("#startDate")
    $eventDate.text(date)
  })
  $("#startTime").on("input", function () {
    let startTime = $(this).val().length

  })
  $("#endTime").on("input", function () {
    let endTime = $(this).val().length

  })
})
