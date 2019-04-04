#!/bin/sh

clear

settings(){
    # Get the original image
    image=$1

    # Get image name
    name=${image%.*}

    # Get the number for the random
    number=$2

    # Check if $number is an integer 
    # throw an error if it's not
    if ! [[ "$number" =~ ^[0-9]+$ ]]; then
        error "!@"
    else
        glitch "!@"
    fi
}

glitch(){
    # I'm not sure why i__gli()
    # doesn't work with png images
    # (and that's really strange
    # because it is the same code
    # gifsy.sh uses) so if $image
    # is a png file it makes a
    # copy in jpg format

    # Get the image extension
    extension="${image##*.}"

    if [ $extension == "png" ]; then 
        convert "$image" "${name}.jpg"
        image=${name}.jpg
    fi

    # Name of the new image
    new_image=glitch_$image


    # Make a copy of the original image
    cat "$image" > "$new_image"

    # I'm not really sure what's happening here
    function i__gli() {
            fileSize=$(wc -c < "$1");
            headerSize=1000
            skip=$(shuf -i "$headerSize"-"$fileSize" -n 1)
            count=$(shuf -i 1-10 -n 1)

            for i in $(seq 1 $count)
            do
                byteStr=$byteStr'\x'$(shuf -i 0-254 -n 1)
            done    

            echo $byteStr' @ '$skip
            printf $byteStr | dd of="$new_image" bs=1 seek=$skip count=$count conv=notrunc 
    }

    # Same as before but stronger
    steps=$(shuf -i 1-$number -n 1);
    for i in $(seq 1 $steps);
    do
            byteStr=''; 
            i__gli "$image"
    done

    # Delete the jpg copy file if it was created
    if [ $extension == "png" ]; then
        rm $image
    fi

    exit 0
}

error(){
    echo "Something went wrong."
    exit 1
}

settings "$@"
