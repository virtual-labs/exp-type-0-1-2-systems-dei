var mto = 0.5;
var lab_imp = [],
    dat_imp = [],
    lab_step = [],
    dat_step = [],
    lab_final = [],
    lab_ramp = [],
    dat_ramp = [];
var impeqn,stepeqn;
var kpi,essi,esss,kp;

var eqn;
var poles = [],
    roots = [];

function changepage() {
    var x = document.getElementById("pagechanger").value;
    if (x == 1)
        document.getElementById("sm1").click();
    else if (x == 2)
        document.getElementById("sm2").click();
    else
        document.getElementById("sm3").click();

}
var conclusion;

function addval() {
    lab = [];
    dat = [];
    a = "0"
    var nums, dens;
    var b = document.getElementById("numc").value;
    var r = document.getElementById("denc").value;
    var p = document.getElementById("dena").value;
    var q = document.getElementById("denb").value;
    roots = [];
    poles = [];
    var x1, y1;
    var ni = 0,
        di = 0;

    b1 = parseInt(b);
    a2 = parseInt(p);
    b2 = parseInt(q);

    c2 = parseInt(r) + b1;
    impulseresponse(b1, a2, b2, c2);
    stepresponse(b1, a2, b2, c2);

    //rampresponse(b1, a2, b2, c2);
    
    lc = 1;
    document.getElementById("line1").setAttribute("style", "color:blue");
    document.getElementById("chartcont").setAttribute("style", "display:none");
    document.getElementById("tanswer").setAttribute("style", "display:none;");
    document.getElementById("chartcont1").setAttribute("style", "display:none;");
    for (let i = 1; i < 3; i++) {
        let out = "out" + i;
        let ln = "line" + (i + 1);
        document.getElementById(ln).setAttribute("Style", "color:black");
        document.getElementById(out).setAttribute("style", "display:none");
    }
    if (mto) {
        document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
        document.getElementById("matwork").title = "";
        document.getElementById("mrun").disabled = false;
        document.getElementById("matwork").setAttribute("style", "opacity:1");
        document.getElementById("mrun").classList.remove("mrundisabled", "mrunenabled");
        document.getElementById("mrun").classList.add("mrunenabled");
        document.getElementById("matwork").classList.remove('mat');
        var numerator = "$${\\frac{";
         if (a != 0)
             numerator = numerator + a + "s^2";
         if (b != 0)
             if (a != 0)
                 numerator = numerator + " + " + b;
             else
                 numerator = numerator + b;
         numerator = numerator + "}";
         var denominator = "{";
         if (a2 != 0)
             denominator = denominator + a2.toFixed() + "s^2";
         if (b2 != 0)
             if (a2 != 0)
                 denominator = denominator + " + " + b2.toFixed() + "s";
             else
                 denominator = denominator + b2.toFixed() + "s";
         if (c2 != 0)
             if (b2 != 0)
                 denominator = denominator + " + " + c2.toFixed();
             else
                 denominator = denominator + c2.toFixed();
         denominator = denominator + "}}$$";
         var eqn = numerator + denominator;

         
         document.getElementById("out1").innerHTML = eqn;
         denominator = "{(";
         if (p != 0)
             denominator = denominator + p + "s^2";
         if (q != 0)
             if (p != 0)
                 denominator = denominator + " + " + q + "s";
             else
                 denominator = denominator + q + "s";
         if (r != 0)
             if (q != 0)
                 denominator = denominator + " + " + r;
             else
                 denominator = denominator + r;
         denominator = denominator + " )*s}}$$";
        eqn = numerator + denominator;
         document.getElementById("out3").innerHTML = eqn;
         denominator = "{(";
         if (p != 0)
             denominator = denominator + p + "s^2";
         if (q != 0)
             if (p != 0)
                 denominator = denominator + " + " + q + "s";
             else
                 denominator = denominator + q + "s";
         if (r != 0)
             if (q != 0)
                 denominator = denominator + " + " + r;
             else
                 denominator = denominator + r;
         denominator = denominator + " )*s^2}}$$";
        eqn = numerator + denominator;
        document.getElementById("out2").innerHTML = eqn;
        /*denominator = "{(";
         if (p != 0)
             denominator = denominator + p + "s^2";
         if (q != 0)
             if (p != 0)
                 denominator = denominator + " + " + q + "s";
             else
                 denominator = denominator + q + "s";
         if (r != 0)
             if (q != 0)
                 denominator = denominator + " + " + r;
             else
                 denominator = denominator + r;
         denominator = denominator + " )*s^3}}$$";
        eqn = numerator + denominator;
        document.getElementById("out4").innerHTML = eqn;*/
        //if (c1 > 0)
        // eqn = "$${" + a3.toFixed(5) + b3.toFixed(4) + " * e^{" + c3.toFixed(2) + "*t} * " + "cos({" + c4.toFixed(2) + "})....}$$" + "   $${...." + b4.toFixed(4) + " *  e^{" + c3.toFixed(2) + "*t} * " + "sin({" + c4.toFixed(2) + "}) " + "}$$";
        /*        else if (c1 == 0)
                    eqn = "$${" + co1.toFixed(5) + "-1*" + co1.toFixed(4) + "* e^{-1*" + co2.toFixed(2) + "*t}" + "-1*" + co3.toFixed(4) + "*e^{-1*" + co2.toFixed(2) + "*t}*t}$$";
                else
                    eqn = "$${" + a3.toFixed(5) + b3.toFixed(4) + " * e^{" + c3.toFixed(2) + "*t} * " + "cosh({" + c4.toFixed(2) + "})....}$$" + "$${...." + b4.toFixed(4) + " * e^{" + c3.toFixed(2) + "*t} * " + "sinh({" + c4.toFixed(2) + "}) " + "}$$";
                */

        document.getElementById("tanswer").innerHTML ="<br> Step Response in time domain:"+ stepeqn +"<br>Kp:"+kp+"<br>ess:"+esss+ "<br><br>Impulse Response in time domain:"+impeqn+"<br>K:"+kpi.toFixed(2)+"<br>ess:"+essi.toFixed(2);
        var j, k;

        var ms = window.matchMedia("(max-width:950px)");
        cwidth(ms);
        ms.addListener(cwidth);

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out1"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out2"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out3"]);
        //MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out4"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "tanswer"]);
    } else {
        mto = 1;

        document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
        document.getElementById("mrun").disabled = true;
        document.getElementById("mrun").classList.remove('mrunenabled', 'mrundisabled');
        document.getElementById("tanswer").setAttribute("style", "display:none");
        document.getElementById("mrun").classList.add('mrundisabled');
        document.getElementById("matwork").classList.add('mat');
        document.getElementById("matwork").setAttribute("style", "opacity:0.5");
        document.getElementById("matwork").title = "Please enter the values of coeffecients of the equation first";
    }
};



function showval() {
    genval("numc", "lc");
    genval("dena", "lp");
    genval("denb", "lq");
    genval("denc", "lr");
};

function genval(idofinput, idofspan) {
    var x;
    x = document.getElementById(idofinput).value;
    //var x1 = x.toFixed(2);
    document.getElementById(idofspan).innerHTML = x;
};

var lc = 1;

function runprog() {
    lc = lc + 1;
    if (lc <= 3)
        highlightline(lc);
    else {
        document.getElementById("fconclusions").innerHTML = conclusion;
        document.getElementById("line3").setAttribute("style", "color:black;");
        document.getElementById("mrun").disabled = true;
        var ms = window.matchMedia("screen and (max-width:950px)");
        document.getElementById("out3").setAttribute("style", "display:block;");
        widthcheck(ms);
        ms.addListener(widthcheck);
        document.getElementById("mrun").disabled = true;
        document.getElementById("mrun").classList.remove("mrunenabled");
        document.getElementById("mrun").classList.add("mrundisabled");
    }
};

function cwidth(ms) {
    console.log(lab_imp);
    console.log(dat_imp);
    if (ms.matches) {
        var chartplot1 = document.getElementById("chartmine1").getContext("2d");
        var chartplot2 = document.getElementById("chartmine2").getContext("2d");
        //var chartplot3 = document.getElementById("chartmine3").getContext("2d");
    } else {
        var chartplot1 = document.getElementById("myChart1").getContext("2d");
        var chartplot2 = document.getElementById("myChart2").getContext("2d");
        //var chartplot3 = document.getElementById("myChart3").getContext("2d");
    }
    if (window.ch1 != undefined)
        window.ch1.destroy();
    if (window.ch2 != undefined)
        window.ch2.destroy();
    /*if (window.ch3 != undefined)
        window.ch3.destroy();*/
    const labelstep = lab_step;
    const datastep = {
        labels: labelstep,

        datasets: [{
            label: "Step Response",
            data: dat_step,
            fill: false,
            pointRadius: 1,
            borderColor: 'rgb(192, 75, 192)',
            tension: 0.1
        }]
    };
    window.ch1 = new Chart(chartplot1, {
        type: "line",
        data: datastep,
        options: {
            title: {
                display: true,
                text: "Step Response",
                fontSize: 14,
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: "Time" !== ' ',
                        labelString: "Time"
                    },

                }],
                yAxes: [{
                    stacked: false, // `true` for stacked area chart, `false` otherwise
                    beginAtZero: false,
                    scaleLabel: {
                        display: "Amplitude" !== '',
                        labelString: "Amplitude"
                    },


                }]
            },
        }
    });
    const labelimp = lab_final;
    const dataimp = {
        labels: labelimp,

        datasets: [{
            label: "Impulse Response",
            data: dat_imp,
            fill: false,
            pointRadius: 1,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    window.ch2 = new Chart(chartplot2, {
        type: "line",
        data: dataimp,
        options: {
            title: {
                display: true,
                text: "Impulse Response",
                fontSize: 14,
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: "Time" !== ' ',
                        labelString: "Time"
                    },

                }],
                yAxes: [{
                    stacked: false, // `true` for stacked area chart, `false` otherwise
                    beginAtZero: false,
                    scaleLabel: {
                        display: "Amplitude" !== '',
                        labelString: "Amplitude"
                    },


                }]
            },
        }
    });
    /*const labelramp = lab_ramp;
    const dataramp = {
        labels: labelramp,

        datasets: [{
            label: "Ramp Response",
            data: dat_ramp,
            fill: false,
            pointRadius: 1,
            borderColor: 'rgb(192, 192, 75)',
            tension: 0.1
        }]
    };
    window.ch3 = new Chart(chartplot3, {
        type: "line",
        data: dataramp,
        options: {
            title: {
                display: true,
                text: "Ramp Response",
                fontSize: 14,
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: "Time" !== ' ',
                        labelString: "Time"
                    },

                }],
                yAxes: [{
                    stacked: false, // `true` for stacked area chart, `false` otherwise
                    beginAtZero: false,
                    scaleLabel: {
                        display: "Amplitude" !== '',
                        labelString: "Amplitude"
                    },


                }]
            },
        }
    });*/
}

function widthcheck(ms) {
    if (ms.matches)
        {document.getElementById("chartcont").setAttribute("style", "display:block;");
    document.getElementById("tanswer").setAttribute("style", "display:block");}
    else {
        document.getElementById("chartcont1").setAttribute("style", "display:block;");
        document.getElementById("tanswer").setAttribute("style", "display:block");
    }
}

function highlightline(l) {
    var ln = "line" + l;
    var out = "out" + parseInt(l - 1);
    console.log(out);
    document.getElementById(ln).setAttribute("style", "color:blue;");
    document.getElementById(out).setAttribute("style", "display:block;");
    if (lc != 1)
        ln = "line" + (l - 1);
    document.getElementById(ln).setAttribute("style", "color:black;");
};

var menu_score = 0;

function dispmenu(val) {
    val.classList.toggle("change");
    menu_score = menu_score + 1;
    if (menu_score == 1) {
        document.getElementById("navbar").setAttribute("style", "display:block");
        document.getElementById("simulation-cont").setAttribute("style", "opacity:0.5");
        if (mto != 1)
            document.getElementById("matwork").setAttribute("style", "opacity:1");
        menu_score = -1;
        document.body.style.backgroundColor = "black";
    } else {
        if (mto != 1)
            document.getElementById("matwork").setAttribute("style", "opacity:0.5");
        document.body.style.backgroundColor = "white";
        document.getElementById("simulation-cont").setAttribute("style", "opacity:01");
        document.getElementById("navbar").setAttribute("style", "display:none");
    }
}

function impulseresponse(b1, a2, b2, c2) {
    lab_imp = [];
    dat_imp = [];
    lab_final = [];
    var co1, co2, co3, co4;
    var stepl, maxl;
        kpi = b1/c2;
     essi = 1/(1+b1/c2);
    var det = 4 * a2 * c2 - Math.pow(b2, 2);
    if (det < 0)
        det = -1 * det;
    var sqd = Math.sqrt(det)
    if (det != 0) {
        
        co1 = b1 / c2;
        co2 = -1 * b2 / 2 / a2;
        co3 = sqd / 2 / a2;
        co4 = b1 * b2 / 2 / a2 / c2 / co3;
        impeqn = "$${" + co1.toFixed(2)+" - "+ co1.toFixed(2)+"*e^{-1*"+co2.toFixed(2)+"*t} &emsp;*cos("+co3.toFixed(2)+"*t) + " + co4.toFixed(2) +"*sin("+co2.toFixed(2)+"*t)}$$";
        if (amplitudei1(co1, co2, co3, co4, 1, 10) == amplitudei1(co1, co2, co3, co4, 1, 9.8)) {
            maxl = 10;
            stepl = 0.05;
        } else if (amplitudei1(co1, co2, co3, co4, 1, 25) == amplitudei1(co1, co2, co3, co4, 1, 24.5)) {
            maxl = 25;
            stepl = 0.125;
        } else if (amplitudei1(co1, co2, co3, co4, 1, 50) == amplitudei1(co1, co2, co3, co4, 1, 49)) {
            maxl = 50;
            stepl = 0.25;
        } else if (amplitudei1(co1, co2, co3, co4, 1, 100) == amplitudei1(co1, co2, co3, co4, 1, 98)) {
            maxl = 100;
            stepl = 0.5;
        } else if (amplitudei1(co1, co2, co3, co4, 1, 200) == amplitudei1(co1, co2, co3, co4, 1, 196)) {
            maxl = 200;
            stepl = 1;
        } else {
            maxl = 1;
            stepl = 0.005;
        }

        for (let i = 0; i <= maxl; i = i + stepl) {
            console.log(co1)
            dat_imp.push(amplitudei1(co1, co2, co3, co4, 0, i));
            lab_final.push(i.toFixed(1));
        }
    } else {
        co1 = b1;
        co2 = 2 * b1 / b2;
        impeqn = "$${ "+ co1.toFixed(2) +" - "+co1.toFixed(2)+"* e^{-1*t} + " + co2.toFixed(2)+"* t * e^{-1*t}}$$";
        if (amplitudei2(co1, co2, 1, 10) == amplitudei2(co1, co2, 1, 9.8)) {
            maxl = 10;
            stepl = 0.05;
        } else if (amplitudei2(co1, co2, 1, 25) == amplitudei2(co1, co2, 1, 24.5)) {
            maxl = 25;
            stepl = 0.125;
        } else if (amplitudei2(co1, co2, 1, 50) == amplitudei2(co1, co2, 1, 49)) {
            maxl = 50;
            stepl = 0.25;
        } else if (amplitudei2(co1, co2, 1, 100) == amplitudei2(co1, co2, 1, 98)) {
            maxl = 100;
            stepl = 0.5;
        } else if (amplitudei2(co1, co2, 1, 200) == amplitudei2(co1, co2, 1, 196)) {
            maxl = 200;
            stepl = 1;
        } else {
            maxl = 1;
            stepl = 0.005;
        }

        for (let i = 0; i <= maxl; i = i + stepl) {
            console.log(co1)
            dat_imp.push(amplitudei2(co1, co2, 0, i));
            lab_final.push(i.toFixed(1));

        }
    }
}




function stepresponse(b1, a2, b2, c2) {
    dat_step = [];
    lab_step = [];
    var co1, co2, co3, co4;
    var stepl, maxl;
    kp = "infinity";
    esss = "0"; 
    var det = 4 * a2 * c2 - Math.pow(b2, 2);
    if (det < 0)
        det = -1 * det;
    var sqd = Math.sqrt(det)
    if (det != 0) {
        
        co1 = b1 * b2 / c2 / c2;
        co2 = b1 / c2;
        co3 = b2 / 2 / a2;
        co4 = sqd / 2 / a2;
        co5 = (b2 * b2 - 2) / 2 / co4;
        maxl = lab_final[lab_final.length - 1] / 20;
        stepl = maxl / 200;
        stepeqn = "$${-1*"+co1.toFixed(2) + "+"+co2.toFixed(2)+"*t+"+co1.toFixed(2)+"*e^{-1*"+co3.toFixed(2)+"*t}*cosh({"+co4.toFixed(2)+"*t})+"+co5.toFixed(2)+"*sinh({"+co4.toFixed(2)+"*t})}$$";
        for (let i = 0; i <= maxl; i = i + stepl) {
            console.log(co1)
            dat_step.push(amplitudes1(co1, co2, co3, co4, co5, i));
            lab_step.push(i.toFixed(1));
        }
    } else {
        co1 = b1;
        co2 = 2 * b1 / b2;
        stepeqn = "$${-1*"+co1.toFixed(2) + "+"+co2.toFixed(2)+"*t+"+co1.toFixed(2)+"*e^{-1*t}+"+co2.toFixed(2)+"*t*e^{-1*t}}$$";
        maxl = lab_final[lab_final.length - 1] / 20;
        stepl = maxl / 200;
        for (let i = 0; i <= maxl; i = i + stepl) {
            console.log(co1)
            dat_step.push(amplitudes2(co1, co2, i));
            lab_step.push(i.toFixed(1));
        }
    }
}

/*function rampresponse(b1,a2,b2,c2)
{
    lab_ramp=[];
    dat_ramp=[];
    var co1,co2,co3,co4,co5,co6,co7,det,stepl,maxl;
    det = b2*b2-4*a2*c2
    if(det<0)
        det = -1*det;
    if(det!=0)
    {co1 = b1*(det)/Math.pow(c2,3);
        co2 = b1*b2/c2/c2;
        co3 = b1/c2/2;
        co4 = b1*a2*4;
        co5 = b2/2/a2;
        co6 = Math.sqrt(det)/2/a2;
        co7 =-1* b2 * det*b1/2/co6;
        maxl = lab_final[lab_final.length - 1] / 20;
        stepl = maxl / 200;
        for (let i = 0; i <= maxl; i = i + stepl) {
            console.log(co1)
            dat_ramp.push(amplituder1(co1, co2, co3, co4, co5,co6,co7, i));
            lab_ramp.push(i.toFixed(1));
        }
    }
    else
    {
        co1 = b1/a2;
        maxl = lab_final[lab_final.length - 1] / 20;
        stepl = maxl / 200;
        for (let i = 0; i <= maxl; i = i + stepl) {
            console.log(co1)
            dat_ramp.push(amplituder2(co1,i));
            lab_ramp.push(i.toFixed(1));
        }
    }

}
*/

function amplitudei1(v1, v2, v3, v4, str, t) {
    var cal = v1 - v1 * Math.pow(Math.E, v2 * t) * Math.cos(v3 * t) - v4 * Math.pow(Math.E, v2 * t) * Math.sin(v3 * t);
    if (str)
        return cal.toFixed(4);
    else
        return cal;
}

function amplitudei2(v1, v2, str, t) {
    var cal = v1 - v1 * Math.pow(Math.E, -1 * t) - v2 * t * Math.pow(Math.E, -1 * t);
    if (str)
        return cal.toFixed(4);
    else
        return cal;
}

function amplitudes1(v1, v2, v3, v4, v5, t) {
    var cal = -1 * v1 + v2 * t + v1 * Math.pow(Math.E, -1 * v3 * t) * Math.cosh(v4 * t) + v5 * Math.sinh(v4 * t);
    return cal;
}

function amplitudes2(v1, v2, t) {
    var cal = -1 * v1 + v2 * t + v1 * Math.pow(Math.E, -1 * t) + v2 * t * Math.pow(Math.E, -1 * t);
    return cal;
}


/*function amplituder1(co1,co2,co3,co4,co5,co6,co7,t){
var cal = co1-1*co2*t+co3*t*t-co4*Math.pow(Math.E,co5*-1*t)*Math.cosh(co6*t)-co7*Math.pow(Math.E,-1*co5*t)*Math.sinh(co6*t);
return cal;

}

function amplituder2(v1,t)
{
var cal = 3*v1-2*v1*t+v1/2*t*t-v1*3*Math.pow(Math.E,-1*t)-v1*t*Math.pow(Math.E,-1*t);
return cal;
}*/