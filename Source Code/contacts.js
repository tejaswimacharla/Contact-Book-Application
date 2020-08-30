$(document).ready(function () {

	var v = "something";

	$("#searchtext").on("input", function () {

		$("#allcontacts").html("");
		var search = $("#searchtext").val();

		$.ajax({
			url: "search.php",
			method: "POST",
			data: {
				index1: search
			},

			success: function (data1) {
				data = $.parseJSON(data1);
				$.each(data, function (key, value) {
					var fname = value.fname;
					var lname = value.lname;
					var contact_id = value.contact_id;
					var rows = '<tr id="' + contact_id + '"><td>' + fname + '</td><td>' + lname + '</td></tr>';
					$("#allcontacts").append(rows);

				});

				$("#allcontacts tr").click(function (e) {
					var id = $(this).attr("id");
					$("#printname").html("");
					$("#printaddress").html("");
					$("#printdate").html("");
					$("#printnumber").html("");
					$("#editbutton").html("");
					$("#add_address").html("");
					$("#add_number").html("");
					$("#add_imp_dates").html("");
					$("#add_update").html("");
					$("#delete").html("");

					$.ajax({
						url: "details.php",
						method: "POST",
						data: {
							userid: id
						},
						success: function (data) {
							data = $.parseJSON(data);
							$.each(data["nameres"], function (key, value) {
								var fname = value.Fname;
								var mname = value.Mname;
								var lname = value.Lname;

								var rows = '<td><img src="images/contact_icon.png" class="img-circle" alt="contact img" width="70" height="70"/></td><td><p><b>' + fname + '</p><p>' + mname + '</p><p>' + lname + '</p></td>';
								$("#printname").append(rows);
							});

							$.each(data["addressres"], function (key, value) {
								var addresstype = value.address_type;
								var address = value.address;
								var city = value.city;
								var state = value.state;
								var zip = value.zip;

								if (address == "") {
									address = 'N/A';
								}

								if (city == "") {
									city = 'N/A';
								}

								if (state == "") {
									state = 'N/A';
								}

								var streetaddress = '<td>' + address + '</td>';
								var cityname = '<td>' + city + '</td>';
								var statename = '<td>' + state + '</td>';
								var zipcode = '<td>' + zip + '</td>';

								var table = '<table><tbody><th><u>' + addresstype + '</u></th><tr><tr><th>Street Address: </th>' + streetaddress + '</tr><tr><th>City: </th>' + cityname + '</tr><tr><th>State: </th>' + statename + '</tr><tr><th>Zip: </th>' + zipcode + '</tr> </tr></tbody></table></br>';
								$("#printaddress").append(table);

							});

							$.each(data["numberres"], function (key, value) {
								var phonetype = value.phone_type;
								var num = value.number;
								if (num != 0) {
									var rows = '<table><tbody><th>' + phonetype + '</th><tr><td>' + num + '</td></tr></tbody></table>';
									$("#printnumber").append(rows);
								}


							});

							$.each(data["dateres"], function (key, value) {
								var datetype = value.date_type;
								var date = value.date;

								var rows = '<table><tbody><th>' + datetype + '</th><tr><td>' + date + '</td></tr></tbody></table>';
								$("#printdate").append(rows);

							});

							var editrow = '<td colspan="2" style="text-align: center;"><button id=' + id + ' type="button" class="btn btn-primary">Edit</button></td>';
							$("#editbutton").append(editrow);
						}
					});

				});
			}

		});


	});

	$.ajax({
		url: "contacts.php",
		method: "POST",
		data: v,

		success: function (data) {

			data = $.parseJSON(data);
			var i = 1;

			$.each(data, function (key, value) {
				var fname = value.Fname;
				var lname = value.Lname;
				var contact_id = value.contact_id;
				var rows = '<tr id="' + contact_id + '"><td>' + fname + '</td><td>' + lname + '</td></tr>';
				$("#allcontacts").append(rows);
			});


			$("#allcontacts tr").click(function (e) {
				var id = $(this).attr("id");
				$("#printname").html("");
				$("#printaddress").html("");
				$("#printdate").html("");
				$("#printnumber").html("");
				$("#editbutton").html("");
				$("#add_address").html("");
				$("#add_number").html("");
				$("#add_imp_dates").html("");
				$("#add_update").html("");
				$("#delete").html("");


				$.ajax({
					url: "details.php",
					method: "POST",
					data: {
						userid: id
					},
					success: function (data) {
						data = $.parseJSON(data);


						$.each(data["nameres"], function (key, value) {
							var fname = value.Fname;
							var mname = value.Mname;
							var lname = value.Lname;

							var rows = '<td><img src="images/contact_icon.png" class="img-circle" alt="contact img" width="70" height="70"/></td><td><p><b>' + fname + '</p><p>' + mname + '</p><p>' + lname + '</p></td>';
							$("#printname").append(rows);
						});

						$.each(data["addressres"], function (key, value) {
							var addresstype = value.address_type;
							var address = value.address;
							var city = value.city;
							var state = value.state;
							var zip = value.zip;

							if (address == "") {
								address = 'N/A';
							}

							if (city == "") {
								city = 'N/A';
							}

							if (state == "") {
								state = 'N/A';
							}

							var streetaddress = '<td>' + address + '</td>';
							var cityname = '<td>' + city + '</td>';
							var statename = '<td>' + state + '</td>';
							var zipcode = '<td>' + zip + '</td>';

							var table = '<table><tbody><th><u>' + addresstype + '</u></th><tr><tr><th>Street Address: </th>' + streetaddress + '</tr><tr><th>City: </th>' + cityname + '</tr><tr><th>State: </th>' + statename + '</tr><tr><th>Zip: </th>' + zipcode + '</tr> </tr></tbody></table></br>';
							$("#printaddress").append(table);

						});

						$.each(data["numberres"], function (key, value) {
							var phonetype = value.phone_type;
							var num = value.number;
							if (num != 0) {
								var rows = '<table><tbody><th>' + phonetype + '</th><tr><td>' + num + '</td></tr></tbody></table>';
								$("#printnumber").append(rows);
							}


						});

						$.each(data["dateres"], function (key, value) {
							var datetype = value.date_type;
							var date = value.date;

							var rows = '<table><tbody><th>' + datetype + '</th><tr><td>' + date + '</td></tr></tbody></table>';
							$("#printdate").append(rows);

						});

						var editrow = '<td colspan="2" style="text-align: center;"><button id=' + id + ' type="button" class="btn btn-primary">Edit</button></td>';
						$("#editbutton").append(editrow);
					}
				});

			});

		}
	});


	$("#editbutton").on("click", "button", function () {

		var contactid = $(this).attr('id');
		$(this).hide();

		//edit address
		var length = $("#printaddress").find("tr").length;
		var no_of_tables = length / 6;

		var n = 0;
		while (n < no_of_tables) {
			var temp = $("#printaddress").find("tr").eq(6 * n + 0).children().eq(0).text();
			var html = '<th>Address Type: </th><td><p><input type="text" value="' + temp + '"></p></td>';
			$("#printaddress").find("tr").eq(6 * n + 0).html(html);

			var temp = $("#printaddress").find("tr").eq(6 * n + 2).children().eq(1).text();
			var html = '<p><input type="text" value="' + temp + '"></p>';
			$("#printaddress").find("tr").eq(6 * n + 2).children().eq(1).html(html);

			temp = $("#printaddress").find("tr").eq(6 * n + 3).children().eq(1).text();
			html = '<p><input type="text" value="' + temp + '"></p>';
			$("#printaddress").find("tr").eq(6 * n + 3).children().eq(1).html(html);

			temp = $("#printaddress").find("tr").eq(6 * n + 4).children().eq(1).text();
			html = '<p><input type="text" value="' + temp + '"></p>';
			$("#printaddress").find("tr").eq(6 * n + 4).children().eq(1).html(html);

			temp = $("#printaddress").find("tr").eq(6 * n + 5).children().eq(1).text();
			html = '<p><input type="text" value="' + temp + '"></p><button type="button" class="btn btn-link">Delete</button>';
			$("#printaddress").find("tr").eq(6 * n + 5).children().eq(1).html(html);
			n++;
		}

		$("#printaddress").on("click", "button", function () {
			$(this).closest("table").remove();
		});

		//edit name
		var temp_fname = $("#printname").find("td:eq(1)").children().eq(0).text();
		var temp_mname = $("#printname").find("td:eq(1)").children().eq(1).text();
		var temp_lname = $("#printname").find("td:eq(1)").children().eq(2).text();

		var fname_html = '<p><input type="text" value="' + temp_fname + '"></p>';
		var mname_html = '<p><input type="text" value="' + temp_mname + '"></p>';
		var lname_html = '<p><input type="text" value="' + temp_lname + '"></p>';

		$("#printname").find("td").eq(1).find("p").eq(0).html(fname_html);
		$("#printname").find("td").eq(1).find("p").eq(2).html(mname_html);
		$("#printname").find("td").eq(1).find("p").eq(4).html(lname_html);

		//edit number
		var num_length = $("#printnumber").find("table").length;
		var n = 0;

		while (n < num_length) {
			var temp_num = $("#printnumber").children().eq(n).find("td").text();
			var temp_num_type = $("#printnumber").children().eq(n).find("th").text();


			var num_type_html = '<th>Number Type: </th><td><p><input type="text" value="' + temp_num_type + '"></p></td>';
			var number_html = '<th>Number: </th><td><p><input type="text" value="' + temp_num + '"></p><button type="button" class="btn btn-link">Delete</button></td>';

			$("#printnumber").children().eq(n).children().children().eq(0).html(num_type_html);
			$("#printnumber").children().eq(n).children().children().eq(1).html(number_html);

			n++;
		}
		$("#printnumber").on("click", "button", function () {
			$(this).closest("table").remove();
		});

		//edit date
		var date_length = $("#printdate").find("table").length;
		var n = 0;

		while (n < date_length) {
			var temp_date_type = $("#printdate").children().eq(n).find("th").text();
			var temp_date = $("#printdate").children().eq(n).find("td").text();

			var date_type_html = '<th>Date Type: </th><td><p><input type="text" value="' + temp_date_type + '"></p></td>';
			var date_html = '<th>Date: </th><td><p><input type="date" value="' + temp_date + '"></p><button type="button" class="btn btn-link">Delete</button></td>';

			$("#printdate").children().eq(n).children().children().eq(0).html(date_type_html);
			$("#printdate").children().eq(n).children().children().eq(1).html(date_html);
			n++;
		}
		$("#printdate").on("click", "button", function () {
			$(this).closest("table").remove();
		});


		var update_btn = '<td colspan="2" style="text-align: center;"><button id="' + contactid + '" type="button" class="btn btn-primary">Update</button></td>';
		var add_address = '<td colspan="2" style="text-align: center;"><button id="add_addr" type="button" class="btn btn-link">Add Address</button></td>';
		var add_num = '<td colspan="2" style="text-align: center;"><button id="add_num" type="button" class="btn btn-link">Add Number</button></td>';
		var add_date = '<td colspan="2" style="text-align: center;"><button id="add_date" type="button" class="btn btn-link">Add Date</button></td>';
		var delete_contact = '<td colspan="2" style="text-align: center;"><button id="' + contactid + '" type="button" class="btn btn-danger">Delete</button></td>';
		$("#add_update").append(update_btn);
		$("#add_address").append(add_address);
		$("#add_number").append(add_num);
		$("#add_imp_dates").append(add_date);
		$("#delete").append(delete_contact);

	});

	$("#add_update").on("click", "button", function () {

		//name fields
		var contact_id = $(this).attr('id');
		var changed_fname = $("#printname").children().eq(1).children().eq(0).find("input").val();
		var changed_mname = $("#printname").children().eq(1).children().eq(1).find("input").val();
		var changed_lname = $("#printname").children().eq(1).children().eq(2).find("input").val();
		var changed_name = [];
		changed_name.push(changed_fname);
		changed_name.push(changed_mname);
		changed_name.push(changed_lname);

		//new number fields
		var number_length = $("#printnumber").find("table").length;
		var all_nums = [];
		for (var i = 0; i < 2 * number_length; i++) {
			var num_data = $("#printnumber").find("input").eq(i).val();
			all_nums.push(num_data);
		}

		//storing new address fields
		var address_length = $("#printaddress").find("table").length;
		var all_address = [];
		for (var i = 0; i < 5 * address_length; i++) {
			var address_data = $("#printaddress").find("input").eq(i).val();
			all_address.push(address_data);
		}

		//storing new date fields
		var dates_length = $("#printdate").find("table").length;
		var all_dates = [];
		for (var i = 0; i < 2 * dates_length; i++) {
			var date_data = $("#printdate").find("input").eq(i).val();
			all_dates.push(date_data);
		}

		$.ajax({
			url: "update.php",
			method: "POST",
			data: {
				index0: contact_id,
				index1: changed_name,
				index2: all_nums,
				index3: all_address,
				index4: all_dates,
				index5: number_length,
				index6: address_length,
				index7: dates_length
			},

			success: function (data1) {
				if (data1 == "success") {
					location.reload();
				}

			}

		});

	});

	$("#addbtn").click(function () {
		$("#printall").html("");

		var add_name = '<tr id="printname"><td><img src="images/contact_icon.png" class="img-circle" alt="contact img" width="70" height="70"></td><td><p><input type="text"></p><p><input type="text"></p><p><input type="text"></p></td></tr>';
		$("#printall").append(add_name);

		var add_number = '<tr><th>Number</th><td id="printnumber"><table><tbody><tr><th>Number Type: </th><td><p><input type="text"></p></td></tr><tr><th>Number: </th><td><p><input type="text"></p></td></tr></tbody></table></td></tr>';
		$("#printall").append(add_number);

		var add_address = '<tr><th>Address</th><td id="printaddress"><table><tbody><tr><th>Address Type: </th><td><p><input type="text"></p></td></tr><tr></tr><tr><th>Street Address: </th><td><p><input type="text"></p></td></tr><tr><th>City: </th><td><p><input type="text"></p></td></tr><tr><th>State: </th><td><p><input type="text"></p></td></tr><tr><th>Zip: </th><td><p><input type="text"></p></td></tr> </tbody></table><br></td></tr>';
		$("#printall").append(add_address);

		var add_date = '<tr><th>Important Dates</th><td id="printdate"><table><tbody><tr><th>Date Type: </th><td><p><input type="text"></p></td></tr><tr><th>Date: </th><td><p><input type="date"></p></td></tr></tbody></table></td></tr>';
		$("#printall").append(add_date);

		var add_buttons = '<tr id="add_address"><td colspan="2" style="text-align: center;"><button id="add_addr" type="button" class="btn btn-link">Add Address</button></td></tr><tr id="add_number"><td colspan="2" style="text-align: center;"><button id="add_num" type="button" class="btn btn-link">Add Number</button></td></tr><tr id="add_imp_dates"><td colspan="2" style="text-align: center;"><button id="add_date" type="button" class="btn btn-link">Add Date</button></td></tr><tr id="add_update"><td colspan="2" style="text-align: center;"><button type="button" id="add_contact" class="btn btn-primary">Save Contact Details</button></td></tr>';
		$("#printall").append(add_buttons);

		$("#add_contact").click(function () {

			var all_details = [];

			var changed_fname = $("#printname").children().eq(1).children().eq(0).find("input").val();
			var changed_mname = $("#printname").children().eq(1).children().eq(1).find("input").val();
			var changed_lname = $("#printname").children().eq(1).children().eq(2).find("input").val();
			var changed_name = [];
			changed_name.push(changed_fname);
			changed_name.push(changed_mname);
			changed_name.push(changed_lname);

			all_details.push(changed_fname);
			all_details.push(changed_mname);
			all_details.push(changed_lname);

			//storing new number fields
			var number_length = $("#printnumber").find("table").length;
			var all_nums = [];
			for (var i = 0; i < 2 * number_length; i++) {
				var num_data = $("#printnumber").find("input").eq(i).val();
				all_nums.push(num_data);
				all_details.push(num_data);
			}

			//new address fields
			var address_length = $("#printaddress").find("table").length;
			var all_address = [];
			for (var i = 0; i < 5 * address_length; i++) {
				var address_data = $("#printaddress").find("input").eq(i).val();
				all_address.push(address_data);
				all_details.push(address_data);
			}

			//storing new date fields
			var dates_length = $("#printdate").find("table").length;
			var all_dates = [];
			for (var i = 0; i < 2 * dates_length; i++) {
				var date_data = $("#printdate").find("input").eq(i).val();
				all_dates.push(date_data);
				all_details.push(date_data);
			}
			var is_null = true;

			for (var i = 0; i < all_details.length; i++) {
				if (all_details[i] != "") {
					is_null = false;
				}
			}

			if (is_null == true) {
				alert("Please enter contact details");
				return false;
			}


			$.ajax({
				url: "insert.php",
				method: "POST",
				data: {
					index1: changed_name,
					index2: all_nums,
					index3: all_address,
					index4: all_dates,
					index5: number_length,
					index6: address_length,
					index7: dates_length
				},

				success: function (data2) {
					if (data2 == "success") {
						location.reload();
					} else {
						alert(data2);
					}
				}

			});

		});

		$("#add_addr").click(function () {
			var new_address = '<table><tbody><tr><th>Address Type: </th><td><p><input type="text" value=""></p></td></tr><tr><th>Street Address: </th><td><p><input type="text" value=""></p></td></tr><tr><th>City: </th><td><p><input type="text" value=""></p></td></tr><tr><th>State: </th><td><p><input type="text" value=""></p></td></tr><tr><th>Zip: </th><td><p><input type="text" value=""></p></td></tr></tbody></table></br>';
			$("#printaddress").append(new_address);

		});

		$("#add_num").click(function () {
			var new_number = '<table><tbody><tr><th>Number Type: </th><td><p><input type="text"></p></td></tr><tr><th>Number: </th><td><p><input type="text"></p></td></tr></tbody></table>';
			$("#printnumber").append(new_number);

		});

		$("#add_date").click(function () {
			var new_date = '<table><tbody><tr><th>Date Type: </th><td><p> <input type="text"> </p></td></tr><tr><th>Date: </th><td><p> <input type="date"> </p></td></tr></tbody></table>';
			$("#printdate").append(new_date);

		});


	});

	$("#add_address").on("click", "button", function () {
		var new_address = '<table><tbody><tr><th>Address Type: </th><td><p><input type="text" value=""></p></td></tr><tr><th>Street Address: </th><td><p><input type="text" value=""></p></td></tr><tr><th>City: </th><td><p><input type="text" value=""></p></td></tr><tr><th>State: </th><td><p><input type="text" value=""></p></td></tr><tr><th>Zip: </th><td><p><input type="text" value=""></p></td></tr></tbody></table></br>';
		$("#printaddress").append(new_address);

	});


	$("#add_number").on("click", "button", function () {
		var new_number = '<table><tbody><tr><th>Number Type: </th><td><p><input type="text"></p></td></tr><tr><th>Number: </th><td><p><input type="text"></p></td></tr></tbody></table>';
		$("#printnumber").append(new_number);

	});

	$("#add_imp_dates").on("click", "button", function () {
		var new_date = '<table><tbody><tr><th>Date Type: </th><td><p> <input type="text"> </p></td></tr><tr><th>Date: </th><td><p> <input type="date"> </p></td></tr></tbody></table>';
		$("#printdate").append(new_date);

	});

	$("#delete").on("click", "button", function () {

		var contact_id = $(this).attr('id');

		$.ajax({
			url: "delete.php",
			method: "POST",
			data: {
				index: contact_id
			},

			success: function (data1) {
				if (data1 == "success") {
					location.reload();
				}
			}

		});

	});

});