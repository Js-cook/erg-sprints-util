export function convertToBase64(file){
    let reader = new FileReader()
    console.log(typeof(file))
    reader.readAsDataURL(file)
    reader.onload = () => {
        return reader.result
    }
}