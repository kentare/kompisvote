export async function askForDeviceOrientationPermission() {
    return new Promise(resolve => {
        if ( typeof( DeviceOrientationEvent ) === "undefined") {
            alert( "DeviceOrientationEvent requestPermission is not defined - it may not work on this phone/browser :( Try Chrome on Android" );
        }
        if (typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
            DeviceOrientationEvent.requestPermission()
                .then( response => {
                // (optional) Do something after API prompt dismissed.
                if ( response == "granted" ) {
                    resolve("granted");
                } else {
                    alert("Permission denied :( please restart this tab and try again.")
                    resolve("Denied");
                }
            }).catch( (e) => {
                    console.error(e);
                    alert("Something went wrong asking for device orientation permission: " + e.message + JSON.stringify(e))
                })
        } else {
            resolve("SOmething else");
        }
    });
}