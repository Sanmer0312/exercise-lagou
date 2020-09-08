window.onload = function () {
  //获取对应的DOM元素
  let city = document.getElementsByClassName("city")[0],
    citybox = document.getElementsByClassName("citybox")[0],
    cboxOverlay = document.getElementsByClassName("cboxOverlay")[0],
    cbox = document.getElementsByClassName("cbox")[0],
    jobTips = document.getElementsByClassName("jobTips"),
    chatMe = document.getElementsByClassName("chatMe"),
    nav = document.getElementsByTagName("nav")[0],
    top = document.getElementById("top"),
    backtop = document.getElementById("backtop"),
    linkBox = document.getElementsByClassName("linkBox")[0],
    minaIMG = document.getElementById("minaIMG"),
    wechatIMG = document.getElementById("wechatIMG"),
    //保存文档Y轴滚动的值
    scrollTop,
    //判断是不是火狐浏览器
    isFF = /FireFox/i.test(navigator.userAgent),
    //判断是不是谷歌浏览器
    isChrome = /Chrome/i.test(navigator.userAgent),
    swiperdiv = document.getElementsByClassName("swiper")[0],
    points = document.getElementsByClassName("point");
  
  //开启图片轮播
  swiper(swiperdiv, points, 840);
  
  //点击切换城市出现遮罩层
  city.onclick = function () {
    citybox.style.display = "flex";
    setTimeout(function () {
      cboxOverlay.style.opacity = "0.9";
      cbox.style.width = "502px";
      cbox.style.height = "563px";
    }, 100);
  };
  cboxOverlay.onclick = function () {
    citybox.style.display = "none";
    setTimeout(function () {
      cboxOverlay.style.opacity = "0.1";
      cbox.style.width = "589px";
      cbox.style.height = "528px";
    }, 100);
  };
  
  //jobTips点击消失
  for (let i = 0; i < jobTips.length; i++) {
    jobTips[i].lastElementChild.onclick = function () {
      this.parentElement.style.display = "none";
    };
  }
  
  //给所有chatMe添加鼠标移入、移出事件
  for (let i = 0; i < chatMe.length; i++) {
    let timer;
    //这个that是为了兼容IE11
    let that;
    chatMe[i].onmouseover = function () {
      that = this;
      clearTimeout(timer);
      this.firstElementChild.style.display = "block";
    };
    chatMe[i].onmouseout = function () {
      timer = setTimeout(function () {
        that.firstElementChild.style.display = "none";
      }, 150);
    };
  }
  
  //图片父元素移入事件
  function onIMG(element) {
    let timer;
    let timer1;
    element.parentElement.onmouseover = function () {
      element.style.display = "block";
      clearTimeout(timer1);
      timer = setTimeout(function () {
        element.style.opacity = "1";
      }, 100);
    };
    element.parentElement.onmouseout = function () {
      clearTimeout(timer);
      timer1 = setTimeout(function () {
        element.style.display = "none";
      }, 500);
      element.style.opacity = "0";
    };
  }
  onIMG(minaIMG);
  onIMG(wechatIMG);
  
  //给展开按钮添加效果
  linkBox.lastElementChild.onclick = function () {
    if (this.innerHTML == "展开<i></i>") {
      this.innerHTML = "收起<i></i>";
      linkBox.firstElementChild.style.height = "auto";
      linkBox.lastElementChild.lastElementChild.style.transform = "rotate(180deg)";
      linkBox.lastElementChild.lastElementChild.style.top = "7px";
    } else {
      this.innerHTML = "展开<i></i>";
      linkBox.firstElementChild.style.height = "30px";
    }
  };
  
  //监听文档滚动事件，根据窗口滚动情况给对应DOM元素添加样式
  window.addEventListener("scroll", function () {
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    //如果文档垂直滚动的像素数大于1，则nav为fixed定位
    if (scrollTop > 1) {
      nav.style.position = "fixed";
      top.style.display = "block";
    } else {
      nav.style.position = "relative";
      top.style.display = "none";
    }
    //如果文档垂直滚动的像素数大于40，backtop按钮出现
    if (scrollTop > 40) {
      backtop.style.display = "block";
    } else {
      backtop.style.display = "none";
    }
  });
  
  //给backtop添加效果
  backtop.onclick = function () {
    //阻止浏览器默认方法
    const fn = function (e) {
      e.preventDefault();
    };
    //文档垂直滚动动画
    let timer = setTimeout(function () {
      if (scrollTop > 5) {
        window.requestAnimationFrame(arguments.callee);
        window.scrollTo(0, scrollTop - scrollTop / 8);
        //动画播放时阻止文档鼠标滚动默认行为
        if (isFF) {
          document.body.addEventListener("DOMMouseScroll", fn, false);
        } else {
          document.body.addEventListener("mousewheel", fn, { passive: false });
        }
      } else {
        //动画播放完成，清除定时器
        clearTimeout(timer);
        console.log("clear");
        //取消阻止文档鼠标滚动默认行为
        if (isFF) {
          document.body.removeEventListener("DOMMouseScroll", fn);
        } else if (isChrome) {
          document.body.removeEventListener("mousewheel", fn);
        } else {
          document.body.removeEventListener("mousewheel", fn, true);
        }
        return;
      }
    }, 100);
  };
};
