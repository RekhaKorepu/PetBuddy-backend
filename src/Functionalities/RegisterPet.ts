import PetDetails from "../models/userPet";
export async function addPet(username: string, petInfo: any) {
    try {
      const pet = await PetDetails.findOne({
        username: username,
        "petDetails.petName": petInfo.name,
      });
  
      if (pet) {
        return "Pet is already registered";
      }
  
      let userpet = await PetDetails.findOne({ username });
  
      if (userpet) {
       userpet.petDetails.push({
          image: [petInfo.image],
          petName: petInfo.name,
          breed: petInfo.breed,
          emergencyContact: petInfo.contact,
          age: petInfo.age,
          weight: petInfo.weight,
          height: petInfo.height,
          gender: petInfo.gender,
          color: petInfo.color,
          remarks: petInfo.remarks,
        });
        await userpet.save();
      } else {

        const newPet = new PetDetails({
          username: username,
          petDetails: [
            {
              image: [petInfo.image],
              petName: petInfo.name,
              breed: petInfo.breed,
              emergencyContact: petInfo.contact,
              age: petInfo.age,
              weight: petInfo.weight,
              height: petInfo.height,
              gender: petInfo.gender,
              color: petInfo.color,
              remarks: petInfo.remarks,
            },
          ],
        });
        await newPet.save();
      }
    return "New pet added successfully";
    } catch (error) {

      throw new Error("Failed to add pet.");
    }
  }