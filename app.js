
const express=require('express');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost')
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'))
db.once('open',()=>{
    console.log("mongo connected")
})

var roomSchema = mongoose.Schema({
    meal:String,
    location:String,
    members:[{
        name:String,
        time:Number,
        place:String
    }]
});
var Room=mongoose.model('Kitchens',roomSchema);

// var firstRoom=new Room()
// firstRoom.save();

var app=express();

// Room.find((err, rooms)=> {
//     console.log("Rooms found :: ")
//     for(var i=0;i<rooms.length;i++) {
//         console.log("==============")
//         console.log(rooms[i])
        // console.log(rooms[i].meal);
    // }
    // console.log(rooms);
// });

app.get('/rooms',(req,res)=>{
    Room.find('',(err,rooms)=>{
        for(var i=0;i<rooms.length;i++){
            var temp={}
            temp.meal=rooms[i].meal;
            temp.location=rooms[i].location;
            temp.count=0;
            for(var j=0;j<rooms[i].members.length;j++) {
                temp.count++;
            }
            res.write(JSON.stringify(temp))
        }
        res.end();
    })
})
app.get("/members",(req,res)=>{
    var roomNumber = req.query.roomNumber
    console.log(roomNumber)
    Room.find('',(err,rooms)=>{
        var nameArray=[]
        for(var i=0;i<rooms[roomNumber].members.length;i++){
            
            nameArray.push(rooms[roomNumber].members[i].name);
            console.log(JSON.stringify(nameArray))
            
        }
        res.send(JSON.stringify(nameArray));
        
    })
    
})
app.get('/firstRoomMembers',(req,res)=>{
    res.send(roomList[0].members)
})
app.listen(3002);