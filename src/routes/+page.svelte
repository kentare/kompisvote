<script lang="ts">
	import Counter from '$lib/Counter.svelte';
		import { onMount, onDestroy } from 'svelte';
		  import { browser } from '$app/environment';
import { askForDeviceOrientationPermission } from '../api/orientationPermission';


  let absolute 
  let alpha = 0
  let beta     = 0
  let gamma    =0
  let res = ""
  let select = 5
  let count = 0
  let spin = 0

const  handleOrientation = (event: any) => {
	alert("Moved")
	console.log("INSIDE")
	count = count++
  console.log(event)
   absolute = event.absolute;
   alpha    = event.alpha;
   beta     = event.beta;
   gamma    = event.gamma;

  // Do stuff with the new orientation data
}
const activateOrientation =  async () => { 

		res = await askForDeviceOrientationPermission()

		   window.addEventListener("deviceorientation", (ev: DeviceOrientationEvent) => {
            alpha = Math.round(ev.alpha)
            beta = Math.round(ev.beta)
            gamma = Math.round(ev.gamma)
    });
	// document.addEventListener("deviceorientation", handleOrientation);
		 } 
  onMount(async () => {
		   window.addEventListener("deviceorientation", (ev: DeviceOrientationEvent) => {
			    // those angles are in degrees
  let  alpha = ev.alpha;  
    let  beta = ev.beta;
    let  gamma = ev.gamma

    let  betaR = beta / 180 * Math.PI;
    let  gammaR = gamma / 180 * Math.PI;
    let  spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR))

    spin = spinR * 180 / Math.PI

	if(Math.abs(spin) > 7)  select = select+(spin / 150)
	if(select > 10) select = 10
	if(select < 0) select = 0

    });
  })
	

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="box" style="--spin: {spin}deg"></div>
	<br />
	{spin.toFixed(2)}
	<br/>
	  <input type="range" min="1" max="10" value={select} class="slider" >
	  {select.toFixed(1)}

	<br />
	<button on:click={activateOrientation}>Activate enhanced voting</button>

</section>

<style>
	.box {
		background-color: red;
		height: 50px;
		width: 30px;
		transform: rotate(var(--spin));
	}
	section {
		margin-left: auto;
		margin-right: auto;
	}

</style>
