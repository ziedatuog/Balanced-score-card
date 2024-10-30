const IdSpecify = (type, name) => {
    const length = name.length;
    const date = Date.now().toString();
    const finalDate=date.slice(date.length-6,date.length);
    const firstLetter = name.charAt(0);
    const middleLetter = name.charAt(length / 2);
    const lastLetter = name.charAt(length - 1);
    return type.concat(firstLetter, middleLetter, lastLetter, finalDate);
  };
 
  module.exports=IdSpecify;
  