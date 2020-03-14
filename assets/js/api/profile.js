  var count = 2;

  function blockUnblock() {
    count += 1;
    console.log(count)

    if (isOdd(count) == true) {
      document.getElementById("blockUnblock").innerHTML = "Bloquear configurações";
      document.getElementById("blockUnblock").className = "text-white btn btn-sm btn-danger"
      document.getElementById("input-name").disabled = false
      // document.getElementById("input-email").disabled = false
      document.getElementById("input-nif").disabled = false
      // document.getElementById("input-phone").disabled = false
      document.getElementById("input-cidade").disabled = false
      document.getElementById("input-pais").disabled = false
      document.getElementById("filetag").disabled = false
      document.getElementById("atualizarConta").disabled = false
      document.getElementById("apagarConta").disabled = false
    }
    else {
      document.getElementById("blockUnblock").innerHTML = "Desbloquear configurações";
      document.getElementById("blockUnblock").className = "text-white btn btn-sm btn-success"
      document.getElementById("input-name").disabled = true
      // document.getElementById("input-email").disabled = true
      document.getElementById("input-nif").disabled = true
      // document.getElementById("input-phone").disabled = true
      document.getElementById("input-cidade").disabled = true
      document.getElementById("input-pais").disabled = true
      document.getElementById("filetag").disabled = true
      document.getElementById("atualizarConta").disabled = true
      document.getElementById("apagarConta").disabled = true
    }

    function isEven(n) {
      return n % 2 == 0;
    }

    function isOdd(n) {
      return Math.abs(n % 2) == 1;
    }
  }
  