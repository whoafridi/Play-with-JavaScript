var csv_file_API = './UsersSample.csv';

// Do some stuff when page hmtl page is launched
$(document).ready(function () {

    // read csv file and convert to json format using ajax
    $.ajax({

        type: 'GET',

        url: csv_file_API,

        dataType: 'text',

        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },

        success: function (data) {

            var jsonData = $.csv.toObjects(data);

            console.log(jsonData);

            $.each(jsonData, function (index, value) {

                $('#showCSV').append(

                    '<li class="list-group-item d-flex justify-content-between align-items-center">' + 
                        
                        '<span style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value['FIRST NAME'] +
                        '</span>' +

                        '<span style="width: 15%; font-size: 1rem;  color: #37474F">' +
                            value['LAST NAME'] +
                        '</span>' +

                        '<span class="">' +
                            value['PHONE NUMBER'] +
                        '</span>' +

                        '<span class="">' +
                            value['EMAIL ADDRESS'] +
                        '</span>' +

                    '</li>'
                );

            });

        } // end: Ajax success API call

    }); // end: of Ajax call

}); // end: document.ready()