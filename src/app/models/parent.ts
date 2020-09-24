export interface ParentModel {
  _id: string;
  name: {
    firstname :  string,
    lastname  :  string 
  },
  address: {
    country: string,
    street:  string,
    zip:     string,
    city:    string,
  },
  notes:     string,
  job:       string,
  email:     string,
  phone:     number,
  ginder:    string,
  roll:      string,
  imageUrl:  string,
  birthdate: Date,
  created_at: Date,
  activeAccount: boolean,
  childes:    [],
  parentCodeId: any,
}

