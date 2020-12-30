class Button {
  constructor(string, x, y, fontSize, selector=false, centerX=true, centerY=true) {
    this.string = string;
    this.fontSize = fontSize;
    this.bounds = font.textBounds(string, x, y, fontSize);
    this.bounds.y += this.bounds.h
    
    this.centerX = centerX
    this.centerY = centerY
    if (centerX) {
      this.bounds.x -= this.bounds.w/2
    }
    if (centerY) {
      this.bounds.y -= this.bounds.h/2
    }
    
    if (selector) {
      this.clickFunc = this.selectButton;
    } else {
      this.clickFunc = undefined
    }
    this.unclickFunc = undefined
    
    this.selector = selector
    this.selected = false;
    this.clicked = false;
    this.padding = 8;
    this.hidden = false;
    
    buttons.push(this)
  }
  
  selectButton() {
    for (var b of buttons) {
      b.selected = false
    }
    this.selected = true
  }
  
  unselectButton() {
    for (var b of buttons) {
      b.selected = false
    }
    
    if (this.unclickFunc) {
      this.unclickFunc()
    }
  }
  
  buttonIsClicked() {
    for (var b of buttons) {
      if (b.clicked) {
        return true
      }
    }
    return false
  }
  
  onclick(func) {
    this.clickFunc = func
  }
  
  offclick(func) {
    this.unclickFunc = func
  }
  
  hide() {
    this.hidden = true
  }
  
  show() {
    this.hidden = false;
  }
  
  change(x, y, size) {
    this.fontSize = size
    this.bounds = font.textBounds(this.string, x, y, size);
    this.bounds.y += this.bounds.h
    
    if (this.centerX) {
      this.bounds.x -= this.bounds.w/2
    }
    if (this.centerY) {
      this.bounds.y -= this.bounds.h/2
    }
  }
  
  changeeText(text) {
    this.string = text
    this.bounds = font.textBounds(this.string, x, y, size);
    this.bounds.y += this.bounds.h
    
    if (this.centerX) {
      this.bounds.x -= this.bounds.w/2
    }
    if (this.centerY) {
      this.bounds.y -= this.bounds.h/2
    }
  }
  
  update() {
    if (mouseIsPressed && !this.hidden) {
      if (mouseX >= this.bounds.x - this.padding && mouseX <= this.bounds.x + this.bounds.w + this.padding && mouseY >= this.bounds.y - this.padding && mouseY <= this.bounds.y + this.bounds.h + this.padding) {
        if (this.clickFunc) {
          this.clickFunc()
        }
        this.clicked = true
      } else if (this.selector) {
        for (var b of buttons) {
          if (!this.buttonIsClicked()) {
            this.unselectButton()
          }
        }
        this.clicked = false
      } else {
        this.clicked = false
      }
    }
  }
  
  draw() {
    if (!this.hidden) {
      noFill()
      stroke(255)

      //rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)

      if (this.selected) {
        stroke(255, 255, 0)
        strokeWeight(2)
        rect(this.bounds.x - this.padding, this.bounds.y - this.padding, this.bounds.w + this.padding * 2, this.bounds.h + this.padding * 2)
      }

      textFont(font)
      textSize(this.fontSize)
      noFill()
      stroke(255)
      strokeWeight(1)
      text(this.string, this.bounds.x, this.bounds.y + this.bounds.h)
    }
  }
}
