/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		// window.addEventListener("batterystatus", onBatteryStatus, false);
		
		document.getElementById("playAudio").addEventListener("click", playAudio);
		document.getElementById("pauseAudio").addEventListener("click", pauseAudio);
		document.getElementById("stopAudio").addEventListener("click", stopAudio);
		document.getElementById("volumeUp").addEventListener("click", volumeUp);
		document.getElementById("volumeDown").addEventListener("click", volumeDown);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        if(listeningElement)
        listeningElement.setAttribute('style', 'display:none;');
        if(receivedElement)
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function onBatteryStatus(info) {
   alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
}

var myMedia = null;

function playAudio() {
   var src = "/android_asset/www/audio/liang.mp3";

   if(myMedia === null) {
      myMedia = new Media(src, onSuccess, onError);

      function onSuccess() {
         console.log("playAudio Success");
      }

      function onError(error) {
         console.log("playAudio Error: " + error.code);
      }

   }

   myMedia.play();
}

function pauseAudio() {
   if(myMedia) {
      myMedia.pause();
   }
}

function stopAudio() {
   if(myMedia) {
      myMedia.stop(); 
   }
	
   myMedia = null;
}

var volumeValue = 0.5;

function volumeUp() {
   if(myMedia && volumeValue < 1) {
      myMedia.setVolume(volumeValue += 0.1);
   }
}

function volumeDown() {
   if(myMedia && volumeValue > 0) {
      myMedia.setVolume(volumeValue -= 0.1);
   }
}