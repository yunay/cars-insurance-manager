
export const ArrayHelpers = {
    distinct: function (arr: any[]) {
        return arr.filter((value: any, index: any, self: any) => {
            return self.indexOf(value) === index;
        })
    }
}