fails=0
n=1
for t in bench/*-bench.js; do
  echo -e "\n [" $n "-" $t "]"
  node $t || let fails++
  let n++
done
echo -e "\n" $n "bench files executed\n"
exit $fails