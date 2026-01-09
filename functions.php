<?php
/*
	SITE_NAME																	-> variavel com o nome do site
	THEME_URL																	-> variavel com a url do tema
	theme_url()																	-> escreve a url do tema
	THEME_DIR																	-> variavel com o diretorio do tema
	theme_dir()																	-> escreve o diretorio do tema
	permitir_referer()															-> Verifica se uma solicitação ajax foi feita do proprio site
	get_youtube_id_from_url($url)												-> Retorna o codigo do video do youtube
	get_vimeo_id_from_url($url)													-> Retorna o codigo do video do vimeo
	titleLimiter($text, $countText)												-> Limita caracteres
	isMobile()																	-> detecta se o navegador é mobile
	google_captcha_check($token)												-> verifica se o token do captcha é válido
	get_request($url,$method = 'GET|POST',$params = [], $token = '',$headers)	-> faz um request com os parametros passados, o token serve para autenticação Bearer
	set_mautic($params, $formId=1, $files=[])									-> integração com o mautic
	*/

$config = array(
	'google_api_key'					=> '',
	'google_recaptcha_key'				=> '6LflWqkrAAAAAAZZ-nowHSApsh61BE8Qu4msRbRO', //V3
	'google_recaptcha_secret'			=> '6LflWqkrAAAAAIU_mGr5abAjkT5z1F226GWpk5An',
	'mautic_domain'						=> '',
	'is_woocommerce'					=> false,
	'enable_woocommerce_template_mail'	=> false,
	'enable_css_login'					=> true,
	'enable_classic_editor'				=> true,
	'disable_fullscreen_editor'			=> true,
	'disable_admin_bar'					=> true,
	'disable_wp_jquery'					=> false,
	'disable_wp_emoji'					=> true,
	'disable_wp_embed'					=> false,
	'disable_rest_api'					=> false,
	'enable_cookies'					=> true,
	'version_assets'					=> '1.0.5'
);

/* Adicionar aqui os post types e o slug das paginas que deseja tornar o thumbnail obrigatório */
$config['thumbnail_require']['post_type'] = array();
$config['thumbnail_require']['pages'] = array();

/* Criando os cortes das imagens */
add_image_size('GERAL_banner_desktop', 1920, 600, true);
add_image_size('GERAL_banner_mobile', 768, 600, true);

add_image_size('HOME_banner_principal_desktop', 1920, 1080, true);
add_image_size('HOME_banner_principal_mobile', 768, 600, true);

add_image_size('HOME_noticia_destaque', 492, 358, true);
add_image_size('HOME_noticia_card', 195, 186, true);

add_image_size('MODULO_card', 540, 450, true);
add_image_size('MODULO_timeline', 383, 286, true);
add_image_size('MODULO_timeline_mobile', 321, 197, true);
add_image_size('MODULO_imagem', 1200, 600, true);
add_image_size('MODULO_imagem_mobile', 480, 240, true);
add_image_size('MODULO_galeria_grid', 800, 9999, true);
add_image_size('MODELO_galeria_grid_mobile', 480, 360, true);

add_image_size('NOTICIA_card', 480, 360, true);

add_image_size('MODELO_icones', 9999, 100, false);

require('inc/functions-utils.php');

/* Adicionar texto na imagem destacada */
function texto_imagem_destacada($content, $post_id, $thumbnail_id)
{
	$post_type = get_post_type($post_id);
	$slug = get_post_field('post_name', $post_id);

	$text = ''; // valor padrão

	switch ($post_type) {
		case 'post':
			$text = '<p>Destacada: 1140x416</p>';
			break;
	}
	return $text . $content;
}
add_filter('admin_post_thumbnail_html', 'texto_imagem_destacada', 10, 3);

// functions.php (tema: jricardodev)
add_action('wp_enqueue_scripts', function () {
	// Adicionei a verificação do template da LP aqui
	if (!is_page('ctf') && !is_page_template('page-renda-passiva-2-horas.php')) {
		// jQuery do WP
		wp_enqueue_script('jquery');

		// Seus estilos principais (carregados da forma correta)
		wp_enqueue_style('vendor-styles', get_template_directory_uri() . '/css/vendor.min.css', [], '1.0.4');
		wp_enqueue_style('main-styles', get_template_directory_uri() . '/css/styles.min.css', ['vendor-styles'], '1.0.4');

		// CSS e JS Globais (Swiper e Fancybox)
		wp_enqueue_style('swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css', [], '10');
		wp_enqueue_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js', [], '10', true);

		wp_enqueue_style('fancybox3-css', 'https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css', [], '3.5.7');
		wp_enqueue_script('fancybox3', 'https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js', ['jquery'], '3.5.7', true);

		// Outras Libs JS
		wp_enqueue_script('jquery-mask', 'https://cdn.jsdelivr.net/npm/jquery-mask-plugin@1.14.16/dist/jquery.mask.min.js', ['jquery'], '1.14.16', true);
		wp_enqueue_script('sumoselect', 'https://cdn.jsdelivr.net/npm/sumoselect@3.0.2/jquery.sumoselect.min.js', ['jquery'], '3.0.2', true);

		// Array dinâmico para as dependências do script principal
		$script_dependencies = ['jquery', 'swiper', 'fancybox3'];

		// GSAP (carrega somente na PÁGINA PRINCIPAL)
		if (is_front_page()) {
			wp_enqueue_script('gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', [], '3.12.5', true);
			wp_enqueue_script('gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', ['gsap'], '3.12.5', true);
			wp_enqueue_script('gsap-scrollto', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js', ['gsap'], '3.12.5', true);

			// Adiciona o GSAP como dependência do script principal, SÓ na home
			$script_dependencies[] = 'gsap';
			$script_dependencies[] = 'gsap-scrolltrigger';
			$script_dependencies[] = 'gsap-scrollto';
		}

		// Seus scripts
		wp_enqueue_script('utils', get_template_directory_uri() . '/js/utils.js', ['jquery'], '1.0.0', true);

		// Carrega o script principal com as dependências corretas (com ou sem GSAP)
		wp_enqueue_script(
			'script',
			get_template_directory_uri() . '/js/script.js',
			$script_dependencies, // Usa o array dinâmico
			'1.0.1',
			true
		);

		wp_enqueue_script('modulos', get_template_directory_uri() . '/js/modulos.js', ['jquery'], '1.0.0', true);
		wp_enqueue_script('archive', get_template_directory_uri() . '/js/archive.js', ['jquery'], '1.0.0', true);
	}
});

add_action('wp_head', function() {
    echo '<meta name="referrer" content="unsafe-url" />';
}, 1);

// Remove completamente qualquer CSP para a LP e define uma super permissiva
add_action('init', function() {
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], 'renda-passiva-2-horas') !== false) {
        header_remove("Content-Security-Policy");
        header_remove("X-Content-Security-Policy");
        // CSP super permissiva - permite tudo
        header("Content-Security-Policy: default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * data: blob:; img-src * data: blob:; media-src * data: blob:; font-src * data:; style-src * 'unsafe-inline'; frame-src *; object-src *;");
    }
}, 1);

/* Restrição de tamanho mínimo para imagem destacada */
// Crie um campo de imagem no acf com a restricao de tamanho e informe a chave
function restrict_image_upload()
{
	$post_type = get_post_type($_POST['post_id']);
	switch ($post_type) {
		case 'post':
			$_POST['query']['_acfuploader'] = 'field_62153fc0f4af6';
			break;
	}
	$_POST['_acfuploader'] = $_POST['query']['_acfuploader'];
}

/* Criando o menu */
function register_my_menu()
{
	register_nav_menu('principal', __('Menu Principal', 'theme-slug'));
}
add_action('after_setup_theme', 'register_my_menu');

/* Especifique as páginas que o google recaptcha aparecerá */
function google_recaptcha_pages()
{
	$info_page = get_queried_object();
	$modulos = get_field('modulos', $info_page->ID);

	if (!empty($modulos) && array_intersect(['formulario'], array_column($modulos, 'acf_fc_layout'))) {
		return true;
	}

	return false;
}

/* ================= DEIXANDO CONTÉUDO DA PÁGINA PADRÃO ================= */
function default_fields($value, $post_id, $field)
{
	if ($value !== null) {
		return $value;
	}
	$value = [[
		'acf_fc_layout' => 'content'
	]];

	return $value;
}
add_filter('acf/load_value/name=modulos', 'default_fields', 10, 3);

/* ================= VALIDAÇÃO DOS CAMPOS MODELO FORMULARIO ================= */

function custom_validate_reply_email($valid, $value, $field, $input)
{

	if ($valid !== true) {
		return $valid;
	}

	if (empty($value)) {
		return 'É necessário preencher os campos do Formulário';
	}

	$campos_email = array_filter($value, function ($item) {
		return $item['field_677e9cf20b632'] == 'email';
	});

	if (empty($campos_email)) {
		$valid = 'É necessário Adicionar pelo menos um campo do tipo E-mail';
	} else {

		$campos_email_resposta = array_filter($value, function ($item) {
			return $item['field_677e9cf20b632'] == 'email' && $item['field_677e9dcf0b633'] == true;
		});

		if (empty($campos_email_resposta)) {
			$valid = 'É necessário que pelo menos um dos campos do tipo E-mail seja selecionado como: E-mail de Resposta';
		}
	}

	return $valid;
}

function custom_validate_custom_emails($valid, $value, $field, $input)
{

	if ($valid !== true) {
		return $valid;
	}

	if (empty($value)) {
		return 'É necessário preencher os campos do Formulário';
	}

	$campo_lista_selecao = array_filter($value, function ($item) {
		return $item['field_677e9cf20b632'] == 'select' && $item['field_67915ef7045aa'] == true;
	});

	if (count($campo_lista_selecao) > 1) {
		$valid = 'Só é possivel ter um campo do tipo seleção com E-mails Personalizados';
	}

	return $valid;
}

add_filter('acf/validate_value/key=field_677e9c740b62d', 'custom_validate_reply_email', 20, 4);
add_filter('acf/validate_value/key=field_677e9c740b62d', 'custom_validate_custom_emails', 20, 4);

/* ================= TRANSFORMAÇÃO DO CAMPO GALERIA PARA SLIDE NO THE_CONTENT ================= */

add_filter('post_gallery', 'gallery_content', 10, 2);
function gallery_content($output, $attr)
{
	$args = array(
		'include' => $attr['ids'],
		'post_status' => 'inherit',
		'post_type' => 'attachment',
		'post_mime_type' => 'image',
		'orderby' => 'post__in'
	);

	$attachments = get_posts($args);
	$icone_galeria = THEME_URL . '/img/icons/icon-camera.svg';

	$output = '<div class="slide-content"><div class="swiper"><div class="swiper-wrapper">';

	foreach ($attachments as $id => $attachment) {
		$img_url = $attachment->guid;

		list($width, $height) = getimagesize($img_url);
		if ($width > $height) {
			$image = aq_get_url_resize($img_url, 1090, 600);
			$class = 'card-horizontal';
		} else {
			$image = aq_get_url_resize($img_url, NULL, 600);
			$class = 'card-vertical';
		}

		list($width, $height) = getimagesize($image);

		$image_mobile = aq_get_url_resize($img_url, 500, 500);
		$legenda_galeria = $attachment->post_excerpt;

		$output .= "
                <div class='swiper-slide $class' data-legenda='$legenda_galeria'>
					<div class='image'>
						<picture>
							<source media='(min-width: 768px)' srcset='$image'>
							<img class='img-responsive' src='$image_mobile' width='$width' height='$height' alt='$legenda_galeria'>
						</picture>
					</div>
                </div>
            ";
	}

	$output .=  '
			</div><div class="swiper-pagination"></div></div></div>';
	return $output;
}

/* ================= CRIANDO CAMPOS PERSONALIZADOS APÓS O ENVIO DO FORMULARIO ================= */

if (is_admin()) {
	global $pagenow;
	if (($pagenow == 'post.php') || (get_post_type() == 'formularios')) {
		if (function_exists('acf_add_local_field_group')):
			$fields = get_post_meta($_GET['post']);
			$field_array = array();

			unset($fields['_edit_lock'], $fields['google_recaptcha_token']);

			$form_id = $fields['form_id'][0];
			$form_id = explode('-', $form_id);

			$form = get_field('modulos', $form_id[0])[$form_id[1]];
			$campos = $form['campos'];
			$assunto = $form['assunto'];

			foreach ($campos as $key => $value) {
				$slug_campo = $fields[sanitize_title($value['nome_campo'] . '-' . $assunto)][0];
				$tipo_campo = $value['tipo_campo'];

				if (in_array($tipo_campo, ['tel', 'select'])) {
					$tipo_campo = 'text';
				}

				$field_array[] = array(
					'key' => 'field_' . sanitize_title($slug_campo),
					'label' => $value['nome_campo'],
					'name' => sanitize_title($slug_campo),
					'type' => $tipo_campo,
					'value' => $slug_campo,
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => '',
					'choices' => (is_serialized($slug_campo)) ? unserialize($slug_campo) : '',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				);
			}

			acf_add_local_field_group(
				array(
					'key' => 'group_' . sanitize_title($assunto),
					'title' => $assunto,
					'fields' => $field_array,
					'location' => array(
						array(
							array(
								'param' => 'post_type',
								'operator' => '==',
								'value' => 'formularios',
							),
						),
					),
					'menu_order' => 0,
					'position' => 'normal',
					'style' => 'default',
					'label_placement' => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen' => '',
					'active' => true,
					'description' => '',
				)
			);
		endif;
	}
}

/**
 * REMOVER ESTILOS EXTERNOS APENAS NA LP RENDA PASSIVA
 * (Movido para FORA do is_admin() para funcionar no frontend)
 */
add_action('wp_enqueue_scripts', 'lp_renda_limpar_estilos_conflitantes', 9999);

function lp_renda_limpar_estilos_conflitantes()
{
	// Só executa se for o template da LP
	if (!is_page_template('page-renda-passiva-2-horas.php')) {
		return;
	}

	// --- 1. Remove CSS do Elementor ---
	wp_dequeue_style('elementor-frontend');
	wp_deregister_style('elementor-frontend');
	wp_dequeue_style('elementor-icons');
	wp_dequeue_style('elementor-animations');
	wp_dequeue_style('elementor-pro');
	wp_dequeue_style('elementor-global');
	wp_dequeue_style('elementor-post-' . get_the_ID()); // Remove CSS específico da página gerado pelo Elementor

	// --- 2. Remove CSS do WordPress (Gutenberg) ---
	wp_dequeue_style('wp-block-library');
	wp_dequeue_style('wp-block-library-theme');
	wp_dequeue_style('global-styles'); // remove variáveis CSS globais do WP 5.9+

	// --- 3. Remove CSS do Tema Pai (se houver Hello Elementor ou similar) ---
	wp_dequeue_style('hello-elementor');
	wp_dequeue_style('hello-elementor-theme-style');
}

/**
 * =========================================================================
 * LP RENDA PASSIVA 2 HORAS - CARREGA ASSETS DO VITE BUILD
 * =========================================================================
 */
add_action('wp_enqueue_scripts', 'lp_renda_carregar_assets', 99);

function lp_renda_carregar_assets() {
    // Só carrega na página específica
    if (!is_page_template('page-renda-passiva-2-horas.php')) {
        return;
    }

    // Caminhos base
    $app_dir = get_stylesheet_directory() . '/app-renda-passiva';
    $app_uri = get_stylesheet_directory_uri() . '/app-renda-passiva';

    // Tenta carregar via manifest.json primeiro
    $manifest_path = $app_dir . '/.vite/manifest.json';
    
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        
        if ($manifest) {
            $entry_point = 'index.html';
            
            if (isset($manifest[$entry_point])) {
                $entry_info = $manifest[$entry_point];

                // Carrega JavaScript principal
                if (isset($entry_info['file'])) {
                    wp_enqueue_script(
                        'lp-renda-app-js',
                        $app_uri . '/' . $entry_info['file'],
                        array(),
                        null,
                        true
                    );
                    
                    // Adiciona type="module" ao script
                    add_filter('script_loader_tag', function($tag, $handle) {
                        if ($handle === 'lp-renda-app-js') {
                            return str_replace('<script ', '<script type="module" ', $tag);
                        }
                        return $tag;
                    }, 10, 2);
                }

                // Carrega CSS
                if (isset($entry_info['css'])) {
                    foreach ($entry_info['css'] as $index => $css_file) {
                        wp_enqueue_style(
                            'lp-renda-app-css-' . $index,
                            $app_uri . '/' . $css_file,
                            array(),
                            null
                        );
                    }
                }
            }
        }
    } else {
        // Fallback usando glob pattern
        $assets_dir = $app_dir . '/assets';
        $assets_uri = $app_uri . '/assets';

        // Carrega JavaScript
        $js_files = glob($assets_dir . '/index-*.js');
        if (!empty($js_files)) {
            $js_file = basename($js_files[0]);
            wp_enqueue_script(
                'lp-renda-app-js',
                $assets_uri . '/' . $js_file,
                array(),
                null,
                true
            );
            
            add_filter('script_loader_tag', function($tag, $handle) {
                if ($handle === 'lp-renda-app-js') {
                    return str_replace('<script ', '<script type="module" ', $tag);
                }
                return $tag;
            }, 10, 2);
        }

        // Carrega CSS
        $css_files = glob($assets_dir . '/index-*.css');
        if (!empty($css_files)) {
            $css_file = basename($css_files[0]);
            wp_enqueue_style(
                'lp-renda-app-css',
                $assets_uri . '/' . $css_file,
                array(),
                null
            );
        }
    }
}

