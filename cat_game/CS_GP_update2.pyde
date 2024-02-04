import random
import os
add_library('minim')

path = os.getcwd()    
BRD_WIDTH = 300
BRD_HGT = 400
player = Minim(this)

# Class for our mouse pointer as a fish image
class Point:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def __str__(self):
        return "({0},{1})".format(self.x, self.y)

class Fish:
    def __init__(self, x=0, y=0, w=0, h=0):
        self.p = Point(x, y)
        self.w = w
        self.h = h
        self.img = loadImage(path + "/images/fish.png")

    def __str__(self):
        return "({0},{1},{2})".format(self.p, self.w, self.h)


    def move(self, x, y):
        self.p.x = x
        self.p.y = y
        
    def display(self):
        # fill(255, 0, 0) # fill with the fish image later
        image(self.img, self.p.x, self.p.y, 50, 50)
        #rect(self.p.x, self.p.y, self.w, self.h)
        




class Animal:
    def __init__(self,x,y,img,img_w,img_h,num_slices,type):
        self.x = x
        self.y = y
        self.type = type
        self.img = loadImage(path + "/images/" + img)
        self.img_w = img_w
        self.img_h = img_h
        self.num_slices = num_slices
        self.slice = 0 
        self.tail = 0
        self.time_left = 40
        self.is_clicked = False

    def display(self):
        self.update()
        #slice this later
        self.slice = (self.slice)% self.num_slices
        image(self.img, self.x, self.y, self.img_w, self.img_h, 0+48*(self.slice), 0, 48*(self.slice+1), self.img_h)
        
    def update(self):
        self.slice += 1
        self.time_left += -1
        
    def is_clicked(self, mouse_x, mouse_y):
        return self.x <= mouse_x <= self.x + 55 and self.y <= mouse_y <= self.y + 55
    
    def draw(self):
        if self.is_clicked:
            stroke(255, 0, 0) # Red border
            strokeWeight(1)
            rect(self.x, self.y, 55, 55)
            image(self.img, self.x, self.y, 55, 55)

 
class Cat(Animal):
    def __init__(self,x,y):
        self.cat_num = random.randint(1,3)
        self.img = "cat" + str(self.cat_num) + ".png"
        Animal.__init__(self, x, y, self.img ,55,55,3,'cat')
    
    def update(self):
        self.slice += 1
        self.time_left += -1

class SuperCat(Animal):
    def __init__(self,x,y):
        self.img = "supercat.png"
        Animal.__init__(self, x, y, self.img ,55,55,2,'supercat')

class Dog(Animal):
    def __init__(self,x,y):
        self.img = "dog.png"
        Animal.__init__(self, x, y, self.img ,55,55,1,'dog')
        
    def update(self):
        
        self.slice += 1
        self.time_left += -1

                

                                                
class Game(list):
    def __init__(self): 
        #setting board dimensions, loading background, generating cats
        self.w = BRD_WIDTH
        self.h = BRD_HGT
        self.img=loadImage(path + "/images/"+"stairs.png")
        self.new = Cat(10+random.randint(0,5)*48, random.choice([15,70,140,220,320]))
        self.fish = Fish(100,300,20,10)


            
        # game time and points
        self.game_over = False
        self.speed = 0
        self.total_time = 121
        self.running_time = millis()
        self.game_pt = 0
        # self.key_handler = {RIGHT:False}
        
        #backround music for the game
        self.bgm = player.loadFile(path + "/sound/bgm.mp3")
        self.bgm.loop()
        self.append(self.new)
        
    # Measuring how much game time the player has left
    def get_time_left(self):
        elapsed_time = (millis() - self.running_time) // 1000 # convert milliseconds to seconds
        game_time_left = self.total_time - elapsed_time
        return max(0, game_time_left)
    
    # calculating has passed since start. This is used to speed up the game.
    def get_time(self):
        elapsed_time = (millis() - self.running_time) // 1000 - 20
        return elapsed_time
    

    
    #generating new animals 
    def new_animal(self):
        if len(self) < 16:
            type = random.randint(0,10)
            x_random = 10+random.randint(0,5)*48
            
            #making sure that animals don't overlap
            y_random = random.choice([15,70,140,220,320])
            no_overlap = 0
            for animal in self:
                if animal.x == x_random and animal.y == y_random:
                    break
                else:
                    no_overlap += 1
    
                
            
            if no_overlap == len(self):
                if type>5:
                    self.append(Cat(x_random, y_random))
                elif 5>=type>0:
                    self.append(Dog(x_random, y_random))
                elif type==0:
                    self.append(SuperCat(x_random, y_random))
            

    # Removing animals from the list when thier time is up
    def check_animal_time(self):
        for animal in self:
            if animal.time_left <= 0:
                self.remove(animal)
    
        
    def update(self):
        self.check_animal_time()
        if len(self) < 16:
            self.new_animal()
        
        # condition to end the game when time is up.
        time_left = self.get_time_left()
        if time_left <= 0:
            self.game_over = True
            
        

        
    #displaying the game
    def display(self):
        
        image(self.img, 0,0,BRD_WIDTH,BRD_HGT)
        for animals in self:
            # if animals in self:
            animals.update()
            animals.display()
        self.update()
        
        # timers on the upper left of how much time is left
        fill(0) 
        textSize(10)
        text(str(self.get_time_left()),20, 1)

        
         
        # every additional 20     seconds in to the game the game, the game will get faster.
        time_running = self.get_time()

        if time_running > 0 and time_running%20 == 0 :
            self.speed += 0.5
            if self.speed == 14.0:
                self.speed += -0.5  

game = Game()
                                                                                                
def setup():
    size(BRD_WIDTH, BRD_HGT)


def draw():
    if frameCount%(max(1, int(20 - game.speed)))==0 or frameCount==1:
        background(210)
        
        # when the ellapsed time measure did not start yet (= when it is negative) we display instructions for the game.
        time_running = game.get_time()
        if time_running < 0:
            background(245)
            fill(0)
            textSize(12)
            textAlign(CENTER, CENTER)
            text("Instructions:" + "\n\n" + "Feed the animals fish by clicking on them." + "\n" + 
                "All cats give you a point. A dog does not!"+ "\n\n" + "Feeding the purple cat will give you " + 
                "\n" + "bonus game time, while feeding the " + "\n" + "dog will REDUCE it"
                "\n\n" + "You will have initially 100 seconds to play."
                "\n" + "game will start in " + str(-time_running)+ "\n" + "Good luck!", 150, 150)
            
        
            
        # Mouse, timer game point that should be displayed when the game is on-going.
        if time_running > 0 and game.game_over==False: 
            game.display()
            textSize(15)
            textAlign(RIGHT, TOP)
            fill(0)   
            game.fish.move(mouseX-25, mouseY-25)
            game.fish.display()
            
            # visual representation of the game time left
            fill(255)
            noStroke()
            time_left = game.get_time_left()
            rect(30,5, time_left*1.5, 10)
            
            fill(0)
            textSize(10)
            text("Score: "+str(game.game_pt), 280, 8)
  
        # Display when game is over
        elif game.game_over == True:
            background(200)
            fill(0)
            textSize(15)
            textAlign(CENTER, CENTER)
            text("Game over!" + "\n" + "Your score is: " + str(game.game_pt) + "\n" + "Click anywhere to restart",150,200)
            
            
# Sound when the cat is clicked    
def mouseClicked():
    cat_sound = player.loadFile(path + "/sound/cat.wav")
    dog_sound=player.loadFile(path + "/sound/negative.wav")
    global game
    # restarts the game when the game is over upon click
    if game.game_over == True:
        game = Game()

    # clicking for the animals on display
    for animal in game:
        if animal.x < mouseX < animal.x+55 and animal.y < mouseY < animal.y+55 and animal.is_clicked == False:
            animal.is_clicked = True # Mark as clicked
            if animal.type == "dog":
                game.total_time += -5
                dog_sound.rewind()
                dog_sound.play()
            elif animal.type == "supercat":
                cat_sound.rewind()
                cat_sound.play()
                game.total_time += 5
                game.game_pt += 1
            else:
                cat_sound.rewind()
                cat_sound.play()
                game.game_pt += 1  # this is for normal cats
            
            game.remove(animal) # Remove from list
            break
