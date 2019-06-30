
export const ValidationHelpers = {

    isStringNullOrEmpty: function (str: string) {

        if (str == null || str == undefined || str.trim() == "")
            return true;

        return false;
    }
}