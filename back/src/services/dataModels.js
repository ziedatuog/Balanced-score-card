function deputy(items){
    return {
        name:`${items.name} ምክትል ኮሚሽነር ቢሮ`,
        id:items._id,
        type: "deputy",
      };
}

function directorate(items){
    return {
        name:`${items.name} ዳይሬክቶሬት`,
        id:items._id,
        deputyId:items.deputyId,
        type: "directorate",
      };
}

function team(items){
    return {
        name:`${items.name} ቡድን`,
        id:items._id,
        deputyId:items.deputyId,
        directorateId:items.directorateId,
        type: "team",
      };
}

function employee(items){
    return {
        name:items.name,
        id:items._id,
        deputyId:items.deputyId,
        directorateId:items.directorateId,
        teamId:items.teamId,
        email:items.userEmail,
        role:items.role,
        type: "employee",
      };
}


module.exports={
    deputy,
    directorate,
    team,
    employee,
}