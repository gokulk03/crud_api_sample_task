const db = require('../database.js')

module.exports.getAllResidents = async ()=>{
    const [records] = await db.query('SELECT * FROM resident')
        .catch(err=>console.log(err))

    return records;
}

module.exports.getResidentId = async (id)=>{
    const [rows] = await db.query('SELECT * FROM resident WHERE id = ?',[id])
        .catch(err=>console.error(err))

    return rows;
}

module.exports.deleteResidentId = async (id)=>{
    const [{affectedRows}] = await db.query('DELETE FROM resident WHERE id = ?',[id])
        .catch(err=>console.error(err))

    return affectedRows;
}

module.exports.addResident = async (first_name,last_name,address,dob)=>{
    try{
        const [newrow] = await db.query('INSERT INTO resident (first_name,last_name,address,dob) VALUES (?,?,?,?)',[first_name,last_name,address,dob])
        return newrow;
    }
    catch(error){
        console.error(error);
        throw new Error("Failed to add the resident")
    }
}

module.exports.updateResident = async (residentId,first_name,last_name,address,dob)=>{
    try{

        const newdata = {first_name,last_name,address,dob};
        const [result]= await db.query("UPDATE resident SET first_name = ?, last_name = ?, address=?, dob=? WHERE id=?",[first_name,last_name,address,dob,residentId]);
        
        if(result.affectedRows ===0){
            throw new Error('No resident found with the given ID');
        }
        return {message:'Resident updated successfully'};
    }
    catch(error){
        console.error(error);
        throw new Error('Failed to update the resident');
    }
}