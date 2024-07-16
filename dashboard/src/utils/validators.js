export function validateEmptyAndLength(requiredLength = 3){
    return (value) => {
        if(!value){
            return '* Este campo é obrigatório!'
        }
    
        if(value.length < requiredLength){
            return `* Este campo precisa de no mínimo ${requiredLength} Caracteres!`
        }  
     
        return ''
    }
}

export function validateEmptyAndEmail(value){
    if(!value){
        return '* Este campo é obrigatório!'
    }

    const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

    if (!isValid) {
        return '* Este campo precisa ser um e-mail!'
      }
    
      return ''
}