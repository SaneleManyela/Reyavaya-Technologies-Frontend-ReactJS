class Validation {
    emailValidation = (email) => {
        if(email == "") {
          return("No email was entered");
        } else if(!((email.indexOf(".") > 0) && (email.indexOf("@") > 0))
          || /[^a-zA-Z0-9.@_-]/.test(email)) {
            return("The email is invalid");
        }
        return "";
    }

    emptyFieldValidation(val) {
        if(val == "") {
            return "The field is empty";
        }
        return "";
    }  
    
    phoneNoValidation(no) {
        if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(no)) {
            return "Invalid phone number";
        }
        return "";
    }
}
export default new Validation();