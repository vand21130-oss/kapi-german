// Encode transparent 3-second GIF loops from the original Kapi artwork.
// Requires ffmpeg. Run from the repository root.
const fs=require('node:fs'),{execFileSync}=require('node:child_process');
const names=['default','sunglasses','sunglasses-mint','sunglasses-rose','flower','flower-blue','top-hat','headband','star-glasses','beret','radio','cocoa','sleep','mirror'];
fs.mkdirSync('assets/kapi-actions/gifs',{recursive:true});
for(const name of names.filter(n=>!process.argv[2]||n===process.argv[2])){
 const source=name==='default'?'capy.png':`assets/kapi-actions/kapi-${name}.png`;
 const calm=['sleep','cocoa'].includes(name), nod=['top-hat','star-glasses'].includes(name);
 const amp=name==='radio'?.045:calm?.005:.02;
 const filter=`scale=510:410:force_original_aspect_ratio=decrease,format=rgba,pad=560:460:(ow-iw)/2:(oh-ih)/2:color=0x00000000,rotate='${amp}*sin(2*PI*t/3)':c=none:ow=iw:oh=ih,pad=560:480:0:10:color=0x00000000,crop=560:460:0:'10+${nod?-4:calm?2:7}*(1-cos(2*PI*t/3))/2'`;
 const out=`assets/kapi-actions/gifs/kapi-${name}`;
 execFileSync('ffmpeg',['-v','error','-y','-i',source,'-vf','scale=510:410:force_original_aspect_ratio=decrease,format=rgba,pad=560:460:(ow-iw)/2:(oh-ih)/2:color=0x00000000','-frames:v','1',out+'-still.png']);
 const inputs=['-loop','1','-framerate','12','-t','3','-i',source];
 let graph=filter;
 if(name==='sunglasses'){
  inputs.push('-loop','1','-framerate','12','-t','3','-i','assets/kapi-actions/kapi-sunglasses-wink.png');
  graph='[0:v]'+filter+'[normal];[1:v]'+filter+"[wink];[normal][wink]blend=all_expr='if(between(T,1,1.25),B,A)'";
 }
 execFileSync('ffmpeg',['-v','error','-y',...inputs,'-filter_complex',graph+',split[a][b];[a]palettegen=reserve_transparent=1[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:alpha_threshold=128','-loop','0',out+'.gif']);
 console.log(name,fs.statSync(out+'.gif').size);
}
