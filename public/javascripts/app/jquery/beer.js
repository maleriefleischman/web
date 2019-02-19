/*
 * Live Off of Beer
 * @author - Malerie Fleischman
 * @mentors - Jeremy C
 *
 * Calculate amount of beer to meet daily caloric needs based on BMI
 *
 * @param (number) height - Height of the user
 * @param (number) weight - Weight of the user
 * @param (string) sex - Current physical sex of the user
 * @param (number) cals - Number of calories in users drink of choice
 *
 *
 * @returns (number) totalBeer - total number of beers user needs to consume to meet daily caloric needs
 */

function beerCalc(height,weight,sex,beerCals){
    var multiplier;
    if (sex == "male"){
        multiplier = 11.65;
    }
    else if (sex == "female"){
        multiplier = 10.53;
    }
    else{
        throw "Something has gone terribly wrong.";
    }
    return ((height + weight) * multiplier)/beerCals;
}

$(document).ready(function(){
    //submit interceptor
    $("#form").submit(function(e){
        e.preventDefault(e);
        var isvalid = $("#form").valid();
        if (isvalid) {
            var sex = $("Input[type=radio][name=sex]:checked").attr("id");
            var height = parseInt($("#height").val());
            var weight = parseInt($("#weight").val());
            var cals = parseInt($("#cals").val());
            var beerCals = (beerCalc(weight,height,sex,cals)).toFixed(2);
            $("#resultsmodal").modal();
            $("#result").text(beerCals)
        }
    });

    //jquery validator initialization and options
    $("#form").validate({
        rules: {
            height: {
                required: true,
                min:58,
                max:84
            },
            weight: {
                required: true,
                min:100,
                max:400
            },
            sex: {
                required: true
            },
            cals: {
                min:  50,
                max: 250,
            },

        },
        messages: {
            height: {
                required: "This field is required",
                min: "Please consult a medical professional to see if living off of beer is right for you.",
                max: "Please consult a medical professional to see if living off of beer is right for you."
            },
            weight: {
                required: "This field is required",
                min: "Please consult a medical professional to see if living off of beer is right for you.",
                max: "Please consult a medical professional to see if living off of beer is right for you."
            },
            sex: {
                required: "This field is required"
            },
            cals: {
                required: "This field is required",
                min: "Are you sure you're drinking beer? This is calculator is only for beer..",
                max: "Are you sure you're drinking beer? This is calculator is only for beer.."
            }
        },
        errorPlacement: function(error, element) {
            // correcting position of error message for radios
            if(element.attr('name') == 'sex') {
                error.insertBefore(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
});
