<?

$host=$_SERVER['HTTP_HOST'];


$startdir = '.';

$showthumbnails = false; 

$showdirs = true;

$forcedownloads = false;

$hide = array(

				'dlf',

				'public_html',				

				'index.php',

				'Thumbs',

				'.htaccess',

				'.htpasswd'

			);

$displayindex = false;

$allowuploads = false;

$overwrite = false;



$indexfiles = array (

				'index.html',

				'index.htm',

				'default.htm',

				'default.html'

			);

			

$filetypes = array (

				'png' => 'jpg.gif',

				'jpeg' => 'jpg.gif',

				'bmp' => 'jpg.gif',

				'jpg' => 'jpg.gif', 

				'gif' => 'gif.gif',

				'zip' => 'archive.png',

				'rar' => 'archive.png',

				'exe' => 'exe.gif',

				'setup' => 'setup.gif',

				'txt' => 'text.png',

				'htm' => 'html.gif',

				'html' => 'html.gif',

				'php' => 'php.gif',				

				'fla' => 'fla.gif',

				'swf' => 'swf.gif',

				'xls' => 'xls.gif',

				'doc' => 'doc.gif',

				'sig' => 'sig.gif',

				'fh10' => 'fh10.gif',

				'pdf' => 'pdf.gif',

				'psd' => 'psd.gif',

				'rm' => 'real.gif',

				'mpg' => 'video.gif',

				'mpeg' => 'video.gif',

				'mov' => 'video2.gif',

				'avi' => 'video.gif',

				'eps' => 'eps.gif',

				'gz' => 'archive.png',

				'asc' => 'sig.gif',

			);

			

error_reporting(0);

if(!function_exists('imagecreatetruecolor')) $showthumbnails = false;

$leadon = $startdir;

if($leadon=='.') $leadon = '';

if((substr($leadon, -1, 1)!='/') && $leadon!='') $leadon = $leadon . '/';

$startdir = $leadon;



if($_GET['dir']) {

	//check this is okay.

	

	if(substr($_GET['dir'], -1, 1)!='/') {

		$_GET['dir'] = $_GET['dir'] . '/';

	}

	

	$dirok = true;

	$dirnames = split('/', $_GET['dir']);

	for($di=0; $di<sizeof($dirnames); $di++) {

		

		if($di<(sizeof($dirnames)-2)) {

			$dotdotdir = $dotdotdir . $dirnames[$di] . '/';

		}

		

		if($dirnames[$di] == '..') {

			$dirok = false;

		}

	}

	

	if(substr($_GET['dir'], 0, 1)=='/') {

		$dirok = false;

	}

	

	if($dirok) {

		 $leadon = $leadon . $_GET['dir'];

	}

}







$opendir = $leadon;

if(!$leadon) $opendir = '.';

if(!file_exists($opendir)) {

	$opendir = '.';

	$leadon = $startdir;

}



clearstatcache();

if ($handle = opendir($opendir)) {

	while (false !== ($file = readdir($handle))) { 

		//first see if this file is required in the listing

		if ($file == "." || $file == "..")  continue;

		$discard = false;

		for($hi=0;$hi<sizeof($hide);$hi++) {

			if(strpos($file, $hide[$hi])!==false) {

				$discard = true;

			}

		}

		

		if($discard) continue;

		if (@filetype($leadon.$file) == "dir") {

			if(!$showdirs) continue;

		

			$n++;

			if($_GET['sort']=="date") {

				$key = @filemtime($leadon.$file) . ".$n";

			}

			else {

				$key = $n;

			}

			$dirs[$key] = $file . "/";

		}

		else {

			$n++;

			if($_GET['sort']=="date") {

				$key = @filemtime($leadon.$file) . ".$n";

			}

			elseif($_GET['sort']=="size") {

				$key = @filesize($leadon.$file) . ".$n";

			}

			else {

				$key = $n;

			}

			$files[$key] = $file;

			

			if($displayindex) {

				if(in_array(strtolower($file), $indexfiles)) {

					header("Location: $file");

					die();

				}

			}

		}

	}

	closedir($handle); 

}



//sort our files

if($_GET['sort']=="date") {

	@ksort($dirs, SORT_NUMERIC);

	@ksort($files, SORT_NUMERIC);

}

elseif($_GET['sort']=="size") {

	@natcasesort($dirs); 

	@ksort($files, SORT_NUMERIC);

}

else {

	@natcasesort($dirs); 

	@natcasesort($files);

}



//order correctly

if($_GET['order']=="desc" && $_GET['sort']!="size") {$dirs = @array_reverse($dirs);}

if($_GET['order']=="desc") {$files = @array_reverse($files);}

$dirs = @array_values($dirs); $files = @array_values($files);





?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#" xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://developers.facebook.com/schema/">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title><? print $host; ?> free hosting server</title>
<meta name="description" content="<? print $host; ?> website created at Bugs 3 free hosting and free servers. Create your own website like <? print $host; ?> absolutely for free at Bugs3.com" />
<meta name="keywords" content="<? print $host; ?>, bugs3, bugs free, free hosting, free server, free servers, bugs3.com, free website, free web host." />
<meta itemprop="name" content="Free Servers" />
<meta itemprop="description" content="Free servers with Ftp, Php, MySQL and with no ads! Get free web hosting and SQL servers for free. Servers free for website hosting with PHP and Cpanel." />
<meta property="og:url" content="http://www.serversfree.com/"/>
<meta property="og:site_name" content="ServersFree.com"/>
<meta property="og:title" content="Free Servers"/>
<meta property="og:description" content="Free servers with Ftp, Php, MySQL and with no ads! Get free web hosting and SQL servers for free. Servers free for website hosting with PHP and Cpanel."/>
<meta property="og:type" content="product"/>
<meta property="og:image" content=""/>
   <style type="text/css">
            html, body							{ height:100% !important; min-height:100%; }
            body, form							{ padding:0; margin:0; }
            body								{ background-color: #F0EDEF; color: #005e86;   font-family:georgia,Arial;    font-size: 14px;}
            div, input, textarea, select		{ position:relative; }

            a									{ color:#ffffff; outline:none; text-decoration:none;}
            a:hover								{ text-decoration:underline; }

            #start					{ width:100%; min-width:1003px; min-height:600px; height:100%; }
            #bef-main				{ width:100%; min-height:100%; overflow:hidden; }
            #main					{ width:100%; height:509px; position:absolute; margin:0 auto; top:50%; }
            .borders				{ padding:10px; background: url("http://cpanel.serversfree.com/themes/login/images/borders.png") no-repeat; width:956px; height:507px; top:-50%; margin:0 auto; }
            .picture				{ width:956px; height:507px; overflow:auto; background:#0495ff url("http://www.serversfree.com/cdn-media/free-servers-bg.jpg") no-repeat scroll 0 0;}

            #free-hosting			{ margin: 130px 0 0 0; }
            #free-hosting h1, #free-hosting h2 			{ text-align: center; color:#005e86; margin-top:40px;margin-left:20px;margin-right:20px;}
            #free-hosting h1 span.ok{ color: #ffffff; }
            #free-hosting ul        { margin: 30px 0 0 50px;  line-height: 22px;}
            #foot					{ width:955px; text-align:right; margin:0 auto; padding-top:13px;color: #9d9d9d;}
            #foot a					{ color:#9d9d9d; }

        </style>
</head>
      <body>
<div id="fb-root"></div>
        <div id="start">
            <div id="bef-main">
                <div id="main">
                    <div class="borders">
                        <div class="picture" title="serversfree.com">
                            <div id="free-hosting">
                                <h1><span class="ok">Congratulations!</span> Your website <strong><? print $host; ?></strong> is running successfully on ServersFree.com free hosting servers!</h1>
                                <h2>Here are few great tips to get started with your new account:</h2>
                                <ul>
<li>Like us to get latest news, updates or free limited offers:   
 <iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FServersFree&amp;send=false&amp;layout=button_count&amp;width=250&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe>
</li>

                                    <li>Upload your website by using FTP (for example with freeware <a rel="nofollow" href="http://filezilla-project.org/download.php" target="_blank">FileZilla</a>) or web based File Manager.</li>
									<li>Use "<a href="http://cpanel.serversfree.com/website/auto-installer">Auto installer</a>" to install most popular blog, forum or e-commerce software such as Joomla, Wordpress, Drupal, osCommerce or phpBB.</li>
                                    <li>Use "<a href="http://cpanel.serversfree.com/website/builder">Easy Website Builder</a>" to build your website without any HTML or coding knowledge.</li>
                                    <li>Already have an existing site or migrating from other provider? Create "zip" archive file and just <a href="http://cpanel.serversfree.com/website/import">import it</a>.</li>
                                    <li>If you have any questions please get <a href="http://cpanel.serversfree.com/helpdesk">Free Support</a>.</li>
<li><strong>Note:</strong> Please delete the file &quot;<strong>default.php</strong>&quot; from the <strong>public_html</strong> folder before installing your new website!</li>

                                </ul>
                            </div>
                        </div>
                        <div id="foot">&copy; 2013 All rights reserved <a href="http://www.serversfree.com/">Free Servers</a> &amp; <a href="http://www.bugs3.com/">Free hosting</a></div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
<!--DEFAULT_WELCOME_PAGE-->
