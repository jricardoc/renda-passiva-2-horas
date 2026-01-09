<?php
/**
 * =========================================================================
 * LP RENDA PASSIVA 2 HORAS - FUNCTIONS.PHP
 * =========================================================================
 * 
 * Arquivo de funções específico para a Landing Page "Renda Passiva 2 Horas"
 * Carrega os assets do build Vite no WordPress
 */

/**
 * Remove estilos do tema pai (Hello Elementor) e do WordPress
 */
function lp_renda_remover_estilos_tema() {
    // Handles do Hello Elementor
    wp_dequeue_style('hello-elementor-theme-style');
    wp_deregister_style('hello-elementor-theme-style');

    wp_dequeue_style('hello-elementor');
    wp_deregister_style('hello-elementor');

    // Handle dos blocos do WordPress
    wp_dequeue_style('wp-block-library');
    wp_deregister_style('wp-block-library');

    // Handle do Elementor
    wp_dequeue_style('elementor-frontend');
    wp_deregister_style('elementor-frontend');
}


/**
 * Registra o hook para carregar assets
 */
add_action('wp_enqueue_scripts', 'lp_renda_carregar_assets', 99);


/**
 * Carrega os assets da LP Renda Passiva 2 Horas
 * Suporta manifest.json (preferido) ou glob pattern como fallback
 */
function lp_renda_carregar_assets() {
    // Só carrega na página específica
    if (!is_page_template('page-renda-passiva-2-horas.php')) {
        return;
    }

    // 1. Remove estilos do tema
    lp_renda_remover_estilos_tema();

    // Caminhos base
    $app_dir = get_stylesheet_directory() . '/app-renda-passiva';
    $app_uri = get_stylesheet_directory_uri() . '/app-renda-passiva';

    // Tenta carregar via manifest.json primeiro
    $manifest_path = $app_dir . '/.vite/manifest.json';
    
    if (file_exists($manifest_path)) {
        // Método 1: Usa manifest.json (preferido)
        lp_renda_carregar_via_manifest($manifest_path, $app_uri);
    } else {
        // Método 2: Fallback usando glob pattern
        lp_renda_carregar_via_glob($app_dir, $app_uri);
    }
}


/**
 * Carrega assets usando manifest.json do Vite
 */
function lp_renda_carregar_via_manifest($manifest_path, $app_uri) {
    $manifest = json_decode(file_get_contents($manifest_path), true);
    
    if (!$manifest) {
        error_log('LP Renda: Erro ao ler manifest.json');
        return;
    }

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


/**
 * Carrega assets usando glob pattern (fallback)
 */
function lp_renda_carregar_via_glob($app_dir, $app_uri) {
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
        
        // Adiciona type="module"
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


/**
 * Adiciona preconnect para Google Fonts (performance)
 */
add_action('wp_head', 'lp_renda_preconnect_fonts', 1);

function lp_renda_preconnect_fonts() {
    if (!is_page_template('page-renda-passiva-2-horas.php')) {
        return;
    }
    
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}

?>