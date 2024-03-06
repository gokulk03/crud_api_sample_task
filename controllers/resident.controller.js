const express = require('express'),router = express.Router()

const service = require('../services/resident.service.js')

router.get('/',async (req,res)=>{
    try{
        const residents = await service.getAllResidents()
        res.send(residents)  
    }catch(error){
        res.status(500).json({message:'Internal Server Error'})
    }
    
});

router.get('/:id',async (req,res)=>{
    try{
        const resident = await service.getResidentId(req.params.id)
        if(resident.length==0){
            res.status(404).json('no record with given id : '+req.params.id)
        }
        res.send(resident) 
    }
    catch(error){
        res.status(500).json({message:'Internal Server Error'})
    }
  
})

router.delete('/:id',async (req,res)=>{
    try{
        const affectedRows = await service.deleteResidentId(req.params.id)
        if(affectedRows==0){
            res.status(404).json('no record with given id : '+req.params.id)
        }else{
            res.send('Resident deleted successfully')
        }
         
        
    }
    catch(error){
        res.status(500).json({message:'Internal Server Error'})
    }
  
})

router.post('/',async (req,res)=>{
    try{
        const {first_name, last_name, address, dob}=req.body;
        if(!first_name||!last_name||!address||!dob){
            return res.status(400).json({message:'All fields are required'});
        }
        const newResident = await service.addResident(first_name,last_name,address,dob);
        res.status(201).json(newResident);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'Internal Server Error'})
    }
  
})

router.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const {first_name,last_name,address,dob}=req.body;
        if(!first_name || !last_name || !address || !dob){
            return res.status(400).json({message:'Please fill in all fields'});

        }
        const updatedResident = await service.updateResident(id,first_name,last_name,address,dob);
        res.status(200).json(updatedResident)

    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Internal Server Error'});
    }
})

module.exports = router;