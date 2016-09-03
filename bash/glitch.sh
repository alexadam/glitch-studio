newFileName='glitch_'$1;
cat "$1" > "$newFileName";

function i__gli() {
	fileSize=$(wc -c < "$1");
	headerSize=1000;
	skip=$(shuf -i "$headerSize"-"$fileSize" -n 1);
	count=$(shuf -i 1-10 -n 1);
	for i in $(seq 1 $count);do byteStr=$byteStr'\x'$(shuf -i 0-254 -n 1); done;    
	echo $byteStr' @ '$skip;
	printf $byteStr | dd of="$newFileName" bs=1 seek=$skip count=$count conv=notrunc 
}

steps=$(shuf -i 1-$2 -n 1);
for i in $(seq 1 $steps);
do
	byteStr=''; 
	i__gli "$1";
done
    


