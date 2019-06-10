  public static $config = array();
  private static $constructed = false;
  
  /**
   * Merge user config and default config
   */
  public static function config(){
    self::$config = array_merge(self::$default_config, self::$config);
  }
  
  public static function construct(){
    self::config();
  }
  
  /**
   * Translate a word
   */
  public static function translate($word, $to = "en", $from = "ru"){
    /**
     * If `to` language is notspecified, use the default
     * one mentioned in `config`->`default`
     */
    if($to == ""){
      $to = self::$config['default']['to'];
    }
    
    $url = "https://translate.google.com/translate_a/single?client=webapp&sl={$from}&tl={$to}&hl={$from}&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&prev=btn&rom=1&ssel=3&tsel=4&tk=520078|504525&q=" . urlencode($word);
    
    $response = self::url_get_contents($url);
    if($response !== false){
        //match
      preg_match('/\[\[\[\"(.*?)\"/', $response, $matches);
      $translated = $matches[1];
    
      if($translated == $word){
        // No Translation available
        return null;
      }else{
        return $translated;
      }
    }else{
      return false;
    }
  }
  
  public static function url_get_contents($url) {
    if (!function_exists('curl_init')){ 
      self::log('CURL is not installed!');
    }else{
      $ch = curl_init();
      
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $output = curl_exec($ch);
      
      if(curl_errno($ch)){
        self::log('cURL Error : ' . curl_error($ch));
        $output = false;
      }
      curl_close($ch);
      
      return $output;
    }
  }
}