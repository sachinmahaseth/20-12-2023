
$("#addPackBtn").click((e) => {
  if (document.getElementById("file-input").files.length == 0) {
    alert("no files selected");
    e.preventDefault();
    return;
  }
});
$("#addPackBtn2").click((e) => {
  if (document.getElementById("file-input").files.length == 0) {
    alert("no files selected");
    e.preventDefault();
    return;
  }
});


$(document).ready(function () {
  $("#dataTable").DataTable({
    pageLength: 5,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "All"],
    ],
    ordering: false,
  });
});

$(document).ready(() => {
  let Category = $("#packageCategoryInp").val();
  jQuery("#packageCategoryDropDown").val(Category);
});

$("#changePassBtn").click(() => {
  let pass1 = $("#currentPassword").val();
  let pass2 = $("#newPassword").val();
  let pass3 = $("#newPassword2").val();

  if (!pass1 || !pass2 || !pass3) {
    alert("Please Fill all the fields")
    return;
  }

  if (pass2 !== pass3) {
    alert("Password Mismated")
    return;
  }

  $.ajax({
    type: "post",
    url: "/changePass",
    data: {
      oldPassword: pass1,
      newPassword: pass2,
    },
    success: function (response) {
      if (response.success == true) {
        $("#modalCenter").modal("toggle");
        alert(response.message);
        $("#currentPassword").val("");
        $("#newPassword").val("");
        $("#newPassword2").val("");
      } else if (response.success == false) {
        alert(response.message);
      } else {
        alert("Try Again, Something went wrong");
      }
    },
  });
});