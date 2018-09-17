const uri = "api/contact";
let contacts = null;

$(document).ready(function () {
    getData();
    $('#edit_contact').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: uri + '/' + id,
            type: ' PUT',
            accepts: ' application/json',
            contentType: ' application/json',
            data: JSON.stringify(itemz),
            success: function (result) {
            }
        });
    })
});

const getData = () => {
    $.ajax({
        type: 'GET',
        url: uri,
        success: (data) => {
            $.each(data, function (index, item) {
             
                contacts = data;

                const checked = item.isComplete ? 'checked' : ""
                
                $(' <tr><td><input disabled="true" type="checkbox" ' + checked + ' ></td>' +
                    ' <td>' + item.firstName + ' </td>' +
                    ' <td>' + item.lastName + ' </td>' +
                    ' <td>' + item.phoneNumber + ' </td>' +
                    ' <td>' + item.email + ' </td>' +
                    ' <td>' + item.occupation + ' </td>' +
                    ' <td><button onclick="editItem(' + item.id + ')">Edit</button></a></td>' +
                    ' <td><button class="delete" onclick="deleteItem(' + item.id + ' )">Delete</button></td>' +
                    ' </tr>').appendTo($('#show_contact'));
            });
        }
    })
}

function addItem() {
    const item = {
        'FirstName': $('#FirstName').val(),
        'LastName': $(' #LastName').val(),
        'PhoneNumber': $('#PhoneNumber').val(),
        'Email': $(' #Email').val(),
        'Occupation': $(' #Occupation').val(),
        'isComplete': true
    };
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {

        },
        success: function (result) {
        }
    })
    $(".register_contact").trigger("reset");
}
function deleteItem(id) {
    contacts.map((item) => {
        if (item.id == id) {
            $.ajax({
                url: uri + '/' + id,
                type: 'DELETE',
                success: function (result) {
                    $(document).on('click', 'button.delete', function () {
                        alert("aa");
                        $(this).closest('tr').remove();
                        return false;
                    });
                }
            })
        }
    })
}

function editItem(id) {
    console.log(id)
    console.log(contacts);
    contacts.map((item) => {
        if (item.id == id) {
            console.log(item)

            $('.manage_view_section').hide();
            $('#createbut').hide();

            $('<div class="Edit_contact_form_section">' +
                '<div class="create_edit_contact_form_section">' +
                '<div id="section_form">' +
                '<div class="form-header">' +
                '<p>Edit Contact</p>' +
                '</div>' +
                '<section id="reg_container">' +
                '<form id="edit_contact">' +
                '<div class="form_layout_2">' +
                '<div class="block_1_2">' +
                '<div class="FirstName">' +
                '<label>First Name:</label>' +
                '<input class="registration_input" id="Edit-FirstName" type="text" name="FirstName" value=" ' + item.firstName + ' "/>' +
                '</div>' +
                '<div class="LastName">' +
                '<label>Last Name:</label>' +
                '<input class="registration_input" id="Edit-LastName" type="text" name="LastName" value=" ' + item.lastName + ' "/>' +
                '</div>' +
                '<div class="PhoneNumber">' +
                '<label>Phone Number :</label>' +
                '<input class="registration_input" id="Edit-PhoneNumber" type="text" name="PhoneNumber" value=" ' + item.phoneNumber + ' "/>' +
                '</div>' +
                '<div class="Email">' +
                '<label>Email:</label>' +
                '<input class="registration_input" id="Edit-Email" type="text" name="Email" value=" ' + item.email + ' " />' +
                '</div>' +
                '<div class="Occupation">' +
                '<label>Occupation:</label>' +
                '<input class="registration_input" id="Edit-Occupation" type="text" name="Occupation" value=" ' + item.occupation + ' " />' +
                '</div>' +
                '<div class="control_edit">' + 
                '<button type="submit" class="button_edit">Save</button>' +
                //'<button onclick="returnAll" class="button_cancel">Cancel</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</form>' +
                '</section>' +
                '</div>' +
                '</div>' +
                '</div>').appendTo($('#edit_field'));       

            const items = {
                'FirstName': $('#Edit-FirstName').val(),
                'LastName': $('#Edit-LastName').val(),
                'PhoneNumber': $('#Edit-PhoneNumber').val(),
                'Email': $('#Edit-Email').val(),
                'Occupation': $('#Edit-Occupation').val(),
                'isComplete': $('isComplete').is('checked')
            };

            itemz = items
        }
    });
}
   
//const returnAll = () => {
//    $('.manage_view_section').show();
//    $('#createbut').show();
//    $('#edit_field').hide();
//}