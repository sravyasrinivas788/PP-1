const mongoose=require('mongoose');
const { default: slugify } = require('slugify');
const {geoencoder}=require('../utils/geoencoder')
const Campschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxlength:50,

    },
    slug:String,
    description:{
        type:String,
        
        trim:true,
        maxlength:500,

    },
    website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL with HTTP or HTTPS'
        ]
      },
      phone:{
        type:String,
        maxlength:[30,'phone number  should be of ten chars']
      },
      email:{
        type:String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
      },
      address: {
        type: String,
        required: [true, 'Please add an address']
      },
      location:{
        type:{
            type:String,
            enum:['Point']
        },
        coordinates:{
            type:[Number],
            index:'2dsphere'
        },
        formattedaddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String

      },
      careers:{
        type:[String],
        required:true,
        enum:[
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'

        ]
      },
      avgrating:{
        type:Number,
        min:1,
        max:10
      },
      averageCost:{
        type:Number,
      },
      photo: {
        type: String,
        default: 'no-photo.jpg'
      },
      housing: {
        type: Boolean,
        default: false
      },
      jobAssistance: {
        type: Boolean,
        default: false
      },
      jobGuarantee: {
        type: Boolean,
        default: false
      },
      acceptGi: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },

})
Campschema.pre("save",function(next){
    this.slug=slugify(this.name)
    next()

})
// Campschema.pre('save',async function(next){
//     const loc=await geoencoder.geocode(this.address)
//     this.location={
//         type:'Point',
//         coordinates:[loc[0].longitude,loc[0].latitude],
//         formattedaddress:loc[0].formattedAddress,
//         city:loc[0].city,
//         state:loc[0].stateCode,
//         zipcode:loc[0].zipcode,
//         country:loc[0].countryCode

//     }
//     this.address=undefined




//     next()
// })

module.exports=mongoose.model('Camp',Campschema);