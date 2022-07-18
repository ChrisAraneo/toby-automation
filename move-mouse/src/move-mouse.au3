; Smoother Mouse Move
; by the DtTvB
; Source: https://www.autoitscript.com/forum/topic/34182-a-smoother-mousemove/

; Ease in function
func __calci1($i, $sm)
    return $i ^ $sm;
endFunc

; Ease out function
func __calci2($i, $sm)
    return 1 - ((1 - $i) ^ $sm);
endFunc

; Ease in out function
func __calci($i, $sm)
    if ($i < 0.5) then
        return __calci1($i * 2, $sm) / 2;
    else
        return (__calci2(($i - 0.5) * 2, $sm) / 2) + 0.5;
    endIf
endFunc

; Ease backward function
func __calof($i, $sm)
    if ($i < 0.5) then
        return __calci($i * 2, $sm);
    else
        return __calci((1 - $i) * 2, $sm);
    endIf
endfunc

; MAIN FUNCTION
func mouseMove2($x2, $y2)
    $x1 = mouseGetPos(0);
    $y1 = mouseGetPos(1);
    $xv = random(-100, 100);
    $yv = random(-100, 100);
    $sm = random(1.5, 2.5);
    $m = random(50, 160);
    for $i = 0 to $m
        $ci = __calci($i / $m, $sm);
        $co = __calof($i / $m, $sm);
        $cx = $x1 + (($x2 - $x1) * $ci) + ($xv * $co);
        $cy = $y1 + (($y2 - $y1) * $ci) + ($yv * $co);
        mouseMove ($cx, $cy, 1);
    next
endFunc

$x = Number($CmdLine[1]);
$y = Number($CmdLine[2]);

; Test Script
mouseMove2($x, $y);