#!/bin/sh

clear

create_gif(){
    # Create Gifsy/
    mkdir Gifsy

    # Select the image
    input_file=$1
    
    # Get number for random
    number=$2

    # Get the image extension
    extension="${input_file##*.}"

    # Get the file name
    file_name="${input_file%.*}"

    # Output message
    echo "Creating $file_name.gif..."

    # Make 25 copies of the original image
    # One per frame
    for i in $(seq 25);
    do
        cp $input_file Gifsy/$file_name$i.$extension
    done

    # Make the gif
    convert -delay 10 -loop 0 Gifsy/$file_name*.$extension $file_name.gif

    # Remove Gifsy/
    rm -rf Gifsy

    # Check if $number is an integer 
    # throw an error if it's not
    if ! [[ "$number" =~ ^[0-9]+$ ]]; then
        error "!@"
    else
        glitch "!@"
    fi
}

glitch(){
    # Save the gif name
    gif_image=${file_name}.gif

    # Create the new file
    new_file='Glitch_'$gif_image
    cat "$gif_image" > "$new_file"

    # Some dark magic
    function i_gli(){
        fileSize=$(wc -c < "$gif_image")
        headerSize=1000
        skip=$(shuf -i "$headerSize"-"$fileSize" -n 1)
        count=$(shuf -i 1-10 -n 1)

        for i in $(seq 1 $count)
        do
            byteStr=$byteStr'\x'$(shuf -i 0-254 -n 1)
        done

        echo $byteStr' @ '$skip;
        printf $byteStr | dd of="$new_file" bs=1 seek=$skip count=$count conv=notrunc 
    }

    # More dark magic
    steps=$(shuf -i 1-$number -n 1)
    for i in $(seq 1 $steps)
    do
	byteStr=''; 
	i_gli "$new_file"
    done

    glitch_that_shit "!@"
}

glitch_that_shit(){
    # Create the animated gif
    # using the glitch effects
    final_image=f_$new_file
    gifsicle --scale 1 -i $new_file > $final_image 
    
    # Remove old files
    rm $new_file
    rm $gif_image

    # Rename the final image
    mv $final_image glitch_$file_name.gif 

    # Exit the script
    exit 0
}

error(){
    echo "Something went wrong."
    echo "Removing temporary files..."
    rm *.gif
    exit 1
}

create_gif "$@"
