var FormHandler = function() {
    return {
        resetForm: function(form_id){
            $('#'+form_id).each(function(){
                this.reset();
            });
        },
        generateJSON: function(form_id) {
            // to read disabled elements
            var disabled_elems          = $('#'+form_id).find(':input:disabled').removeAttr('disabled');
            var serialized_form_vals    = $('#'+form_id).serialize();
            disabled_elems.attr('disabled', 'disabled');

            var form_JSON = createJSON(serialized_form_vals);
            return form_JSON;
        },
        fillForm: function(json_obj){
            $.each(json_obj, function(input_name, value){
                var elem    = $("[name='"+input_name+"']");
                value       = _.unescape(value);
                value       = decodeURIComponent(value);
                if(elem.is('input')){
                    // handle input elements
                    fillInputTypeElements(elem, value);
                } else if(elem.is('textarea')){
                    // handle textarea elements
                    fillTextarea(elem, value);
                } else if (elem.is('select')){
                    // handles the drop down list
                    setSelectList(elem, value);
                }
            });
        }
    }


    /****************** Helper Functions ********************/

    function createJSON(str_to_convert){
        var json_obj    = {};
        var string_arr  = str_to_convert.split('&');

        string_arr.every(function(element, index, array){
            var key_val_arr = element.split('=');
            var key         = key_val_arr[0];
            var value       = _.escape(key_val_arr[1]);
            value           = value.replace(/\+/ig, " ");
            json_obj[key]   = value;

            return true;
        });
        return json_obj;
    }

    function fillTextarea(elem, value){
        var processed_value = value.replace(/\+/ig, " ");
        elem.val(processed_value);
    }

    function fillInputTypeElements(elem, value){
        var type_of_input = elem.attr('type').toLowerCase();

        if(type_of_input == 'text'){
            var processed_value = value.replace(/\+/ig, " ");
            elem.val(processed_value);
        } else if(type_of_input == 'radio'){
            selectRadioOrCheckboxInput(elem.attr('name'), value);
        } else if(type_of_input == 'checkbox'){
            elem.click();
        } else {
            var processed_value = value.replace(/\+/ig, " ");
            elem.val(processed_value);
        }
    }

    function selectRadioOrCheckboxInput(input_name, value){
        var elem = $("input[name='"+input_name+"'][value='"+value+"']");
        elem.prop('checked', 'true');
        elem.click();
    }
    function selectCheckbox(elem, value){
        elem.prop('checked', true);
    }

    function setSelectList(elem, value){
        elem.val(value);
    }
}();
